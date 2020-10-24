import React from 'react';
import { useQuery } from 'react-query';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import HeadingRenderer from './HeadingRenderer';
import dateFormatter from './dateFormatter';
import CaptionBanner from '../CaptionBanner';
import { getElementData } from '../../util/apiHelper';

const queryOption = {
  staleTime: 300000,
  cacheTime: 3600000,
  retry: 1,
};

const ElementView = (props) => {
  let { elementType } = props;
  let id = props.match.params._id;

  const { data, status } = useQuery(`${elementType}?id=${id}`, () => getElementData(elementType, id), {
    ...queryOption,
  });

  const createDateTag = (data) => {
    return `Created: ${dateFormatter(data.createdAt)} | Latest update: ${dateFormatter(data.updatedAt)}`;
  };

  let linkDescription = 'here for more impressions';
  if (data?.link?.includes('github')) {
    linkDescription = 'at Github';
  }

  return (
    <>
      <CaptionBanner
        text={
          status === 'loading'
            ? 'Loading ....'
            : status === 'error'
            ? 'Error getting data!'
            : status === 'success'
            ? data.title
            : ''
        }
      />
      <div className='main-text-page'>
        {status === 'error' &&
          'Probably not a valid id :( If you get here from blog or project try getting back and forth again.'}
        {status === 'success' && (
          <>
            <p className='blog-date'>{createDateTag(data)}</p>
            <p className='blog-description'>{data.description}</p>
            <hr className='blog-dividor' />
            <ReactMarkdown
              className='blog-md'
              source={data.text}
              renderers={{ code: CodeBlock, heading: HeadingRenderer }}
            ></ReactMarkdown>
            {elementType === 'project' && (
              <p>
                Interested? Look into the project <a href={data.link}>{linkDescription}</a>.
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ElementView;
