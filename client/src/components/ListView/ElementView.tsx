import React, { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import MarkdownBlock from './MarkdownBlock';
import useResize from './resize';
import dateFormatter from './dateFormatter';
import CaptionBanner from '../CaptionBanner';
import { getElementData, getElements } from '../../util/apiHelper';
import capFirst from '../../util/stringHelper';
import { IElement } from '../../Interfaces/element.interface';

const queryOption = {
  staleTime: 300000,
  cacheTime: 3600000,
  retry: 1,
};

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

type ElementViewProps = {
  elementType: string;
};

type ParamTypes = {
  _id: string;
};

const ElementView: React.FC<ElementViewProps> = ({ elementType }) => {
  const params = useParams<ParamTypes>();
  const id = params._id!;
  const divRef = useRef(null);
  const maxWidth = useResize(divRef);

  useEffect(() => {
    document.title = `${capFirst(elementType)} | ${
      process.env.REACT_APP_SHOWN_NAME
    }`;
  }, [elementType]);

  const { data, status } = useQuery(
    `${elementType}?id=${id}`,
    () => getElementData(elementType, id),
    queryOption
  );

  const { data: similarData, status: similarStatus } = useQuery(
    `${elementType}s`,
    () => getElements(elementType),
    { ...queryOption }
  );

  const createDateTag = (d: IElement): string => {
    return `Created: ${dateFormatter(
      d.createdAt
    )} | Latest update: ${dateFormatter(d.updatedAt)}`;
  };

  const chooseHeader = (s: string, d: IElement | undefined) => {
    if (s === 'loading') return 'Loading ....';
    if (s === 'error') return 'Error getting data!';
    if (s === 'success' && d) return `${d.title}${d.draft ? ' (Draft)' : ''}`;
    return 'Error getting data!';
  };

  let linkDescription = 'here for more impressions';
  if (data?.link?.includes('github')) {
    linkDescription = 'at GitHub';
  }

  return (
    <>
      <CaptionBanner text={chooseHeader(status, data)} />
      <div className="main-text-page" ref={divRef}>
        <div className="spinner-container">
          {status === 'loading' && <p>&nbsp;</p>}
          <HashLoader
            loading={status === 'loading'}
            color="#004ea7"
            cssOverride={override}
            size={(maxWidth as number) / 2}
          />
        </div>
        {status === 'error' &&
          'Probably not a valid id :( If you get here from blog or project try getting back and forth again.'}
        {status === 'success' && data && (
          <>
            <p className="blog-date">{createDateTag(data)}</p>
            <p className="blog-description">{data.description}</p>
            <p className="blog-categories">
              Categories: {data.category.sort().join(', ')}
            </p>
            <hr className="blog-dividor" />
            <MarkdownBlock sourcedata={data.text} maxWidth={maxWidth} />
            {elementType === 'project' && (
              <p>
                {'Interested? Look into the project '}
                <a href={data.link}>{linkDescription}</a>
              </p>
            )}
            <hr className="blog-dividor" />
            <div className="similar-projects">
              <h6>You may also like:</h6>
              <div className="spinner-container">
                {similarStatus === 'loading' && <p>&nbsp;</p>}
                <HashLoader
                  loading={similarStatus === 'loading'}
                  color="#004ea7"
                  cssOverride={override}
                  size={(maxWidth as number) / 2}
                />
              </div>
              {similarStatus === 'success' && similarData && (
                <ul>
                  {similarData
                    .filter((dat) => {
                      return dat.category.some((cat) =>
                        data.category.includes(cat)
                      );
                    })
                    .map((element) => {
                      return (
                        <li key={element._id}>
                          <Link to={`/${elementType}/${element.slug}`}>
                            {element.title}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ElementView;
