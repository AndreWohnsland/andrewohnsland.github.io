import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import Gallery from 'react-photo-gallery';
import CaptionBanner from '../CaptionBanner';
import { getAllImageData } from '../../util/apiHelper';
import SkeletonPicture from '../../skeletons/SkeletonPicture';

const queryOption = {
  staleTime: 600000,
  cacheTime: 3600000,
};

const PictureView = ({ title }) => {
  const pictureType = title.toLowerCase();

  useEffect(() => {
    document.title = `${title} | Andre Wohnsland`;
  }, [title]);

  const { data, status } = useQuery(
    pictureType,
    () => getAllImageData(pictureType),
    { ...queryOption }
  );

  return (
    <>
      <CaptionBanner text={title} />
      <div className="main-text-picture">
        {status === 'loading' &&
          [1, 2, 3, 4, 5].map((n) => <SkeletonPicture key={n} theme="dark" />)}
        {status === 'error' && <p>Error fetching data!</p>}
        {status === 'success' && (
          <>
            {data.length > 0 ? (
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

export default PictureView;
