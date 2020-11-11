import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import ElementCard from './ElementCard';
import CaptionBanner from '../CaptionBanner';
import { getElements } from '../../util/apiHelper';
import capFirst from '../../util/stringHelper';

const queryOption = {
  staleTime: 60000,
  cacheTime: 3600000,
};

const ListView = ({ elementType, header }) => {
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
        {status === 'loading' && <p>Loading ....</p>}
        {status === 'error' && <p>Error fetching data!</p>}
        {status === 'success' &&
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
