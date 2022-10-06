import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Gallery from 'react-photo-gallery';
import CaptionBanner from './CaptionBanner';
import { getAllImageData } from '../util/apiHelper';
import SkeletonPicture from '../skeletons/SkeletonPicture';

const queryOption = {
  staleTime: 600000,
  cacheTime: 3600000,
};

type ParamTypes = {
  _category: string;
};

const PictureList: React.FC = () => {
  const params = useParams<ParamTypes>();
  const category = params._category!;
  const upperCategory = category.charAt(0).toUpperCase() + category.slice(1);

  useEffect(() => {
    document.title = `${upperCategory} | ${process.env.REACT_APP_SHOWN_NAME}`;
  }, [upperCategory]);

  const { data, status } = useQuery(category, () => getAllImageData(category), {
    ...queryOption,
  });

  return (
    <>
      <CaptionBanner text={upperCategory} />
      <div className="main-text-picture">
        {(status === 'loading' || status === 'idle') &&
          [1, 2, 3, 4, 5].map((n) => <SkeletonPicture key={n} theme="dark" />)}
        {status === 'error' && <p>Error fetching data!</p>}
        {status === 'success' && (
          <>
            {data && data.length > 0 ? (
              <Gallery
                photos={data.sort(() => Math.random() - 0.5)}
                direction="column"
              />
            ) : (
              <p>Currently no Pictures here</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PictureList;
