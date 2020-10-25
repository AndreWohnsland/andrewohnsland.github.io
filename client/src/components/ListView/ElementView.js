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

const ElementView = ({ match, elementType }) => {
  const id = match.params._id;

  const { data, status } = useQuery(
    `${elementType}?id=${id}`,
    () => getElementData(elementType, id),
    queryOption
  );

  const createDateTag = (d) => {
    return `Created: ${dateFormatter(
      d.createdAt
    )} | Latest update: ${dateFormatter(d.updatedAt)}`;
  };

  const chooseHeader = (s, d) => {
    if (s === 'loading') return 'Loading ....';
    if (s === 'error') return 'Error getting data!';
    if (s === 'success') return d.title;
    return '';
  };

  let linkDescription = 'here for more impressions';
  if (data?.link?.includes('github')) {
    linkDescription = 'at Github';
  }

  return (
    <>
      <CaptionBanner text={chooseHeader(status, data)} />
      <div className="main-text-page">
        {status === 'error' &&
          'Probably not a valid id :( If you get here from blog or project try getting back and forth again.'}
        {status === 'success' && (
          <>
            <p className="blog-date">{createDateTag(data)}</p>
            <p className="blog-description">{data.description}</p>
            <hr className="blog-dividor" />
            <ReactMarkdown
              className="blog-md"
              source={data.text}
              renderers={{ code: CodeBlock, heading: HeadingRenderer }}
            />
            {elementType === 'project' && (
              <p>
                {'Interested? Look into the project '}
                <a href={data.link}>{linkDescription}</a>
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ElementView;
