import React from 'react';
import { useQuery } from 'react-query';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import HeadingRenderer from './HeadingRenderer';

const ElementView = (props) => {
  let { elementType } = props;
  let id = props.match.params._id;

  const fetchData = async () => {
    const res = await fetch(`http://localhost:5000/api/${elementType}/${id}`);
    return res.json();
  };

  const { data, status } = useQuery(`${elementType}?id=${id}`, fetchData, { staleTime: 100000, cacheTime: 3600000 });

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
        {status === 'error' && 'Probably not a valid id :('}
        {status === 'success' && (
          <>
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
