import React from 'react';
import { useQuery } from 'react-query';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import HeadingRenderer from './HeadingRenderer';
import axios from 'axios';
import dateFormatter from './dateFormatter';

const ElementView = (props) => {
  let { elementType } = props;
  let id = props.match.params._id;

  const fetchData = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/${elementType}/${id}`);
    return data;
  };

  const queryOption = {
    staleTime: 300000,
    cacheTime: 3600000,
    retry: 1,
  };
  const { data, status } = useQuery(`${elementType}?id=${id}`, fetchData, { ...queryOption });
  const dateInfoStyle = { fontWeight: 'lighter', marginBottom: '0rem' };

  return (
    <>
      <div className='text-center main-header'>
        <h1>
          {status === 'loading' && 'Loading ....'}
          {status === 'error' && 'Error fetching data!'}
          {status === 'success' && data.title}
        </h1>
      </div>
      <br />
      <div className='main-text'>
        {status === 'error' &&
          'Probably not a valid id :( If you get here from blog or project try getting back and forth again.'}
        {status === 'success' && (
          <>
            <p style={dateInfoStyle}>
              <span>Created: {dateFormatter(data.createdAt)}</span>
              <span> | </span>
              <span> Latest update: {dateFormatter(data.updatedAt)}</span>
            </p>
            <p>{data.description}</p>
            <ReactMarkdown
              className='blog-md'
              source={data.text}
              renderers={{ code: CodeBlock, heading: HeadingRenderer }}
            ></ReactMarkdown>
            {elementType === 'project' && (
              <p>
                Interested? Look into the project at <a href={data.link}>Github.</a>
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ElementView;
