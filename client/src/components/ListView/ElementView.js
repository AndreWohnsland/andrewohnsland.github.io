import React, { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import MarkdownBlock from './MarkdownBlock';
import useResize from './resize';
import dateFormatter from './dateFormatter';
import CaptionBanner from '../CaptionBanner';
import { getElementData } from '../../util/apiHelper';
import capFirst from '../../util/stringHelper';

const queryOption = {
  staleTime: 300000,
  cacheTime: 3600000,
  retry: 1,
};

const ElementView = ({ match, elementType }) => {
  const id = match.params._id;
  const divRef = useRef(null);
  const maxWidth = useResize(divRef);

  useEffect(() => {
    document.title = `${capFirst(elementType)} | Andre Wohnsland`;
  }, [elementType]);

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
      <div className="main-text-page" ref={divRef}>
        {status === 'error' &&
          'Probably not a valid id :( If you get here from blog or project try getting back and forth again.'}
        {status === 'success' && (
          <>
            <p className="blog-date">{createDateTag(data)}</p>
            <p className="blog-description">{data.description}</p>
            <hr className="blog-dividor" />
            <MarkdownBlock sourcedata={data.text} maxWidth={maxWidth} />
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
