import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import ElementCard from './ElementCard';
import CaptionBanner from '../CaptionBanner';
import { getElements } from '../../util/apiHelper';
import capFirst from '../../util/stringHelper';
import SkeletonArticle from '../../skeletons/SkeletonArticle';

const queryOption = {
  staleTime: 60000,
  cacheTime: 3600000,
};

type ListViewProps = {
  elementType: string;
  header: string;
};

const ListView: React.FC<ListViewProps> = ({ elementType, header }) => {
  useEffect(() => {
    document.title = `${capFirst(elementType)} | Andre Wohnsland`;
  }, [elementType]);

  const { data, status } = useQuery(
    `${elementType}s`,
    () => getElements(elementType),
    { ...queryOption }
  );

  return (
    <>
      <CaptionBanner text={header} />
      <div className="main-text">
        {status === 'loading' &&
          [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme="dark" />)}
        {status === 'error' && <p>Error fetching data!</p>}
        {status === 'success' &&
          data &&
          data.map((element) => {
            return (
              <ElementCard
                key={element._id}
                element={element}
                elementType={elementType}
              />
            );
          })}
      </div>
    </>
  );
};

export default ListView;
