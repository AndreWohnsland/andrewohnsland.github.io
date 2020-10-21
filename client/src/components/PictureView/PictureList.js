import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Gallery from 'react-photo-gallery';

const PictureView = ({ title }) => {
  const pictureType = title.toLowerCase();

  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const fetchpictures = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/image/${pictureType}`);
    const returnData = await data.map((obj) => {
      return {
        width: obj['width'],
        height: obj['height'],
        src: 'data:image/jpeg;base64,' + arrayBufferToBase64(obj.img.data.data),
        title: obj.name,
      };
    });
    return returnData;
  };
  const { data, status } = useQuery(pictureType, fetchpictures, { staleTime: 120000, cacheTime: 3600000 });

  return (
    <>
      <div className='text-center main-header'>
        <h1>{title}</h1>
      </div>
      <div className='main-text-picture'>
        {status === 'loading' && <p>Loading ....</p>}
        {status === 'error' && <p>Error fetching data!</p>}
        {status === 'success' && (
          <>{data.length > 0 ? <Gallery photos={data} direction={'column'} /> : <p>Currently no Pictures here</p>}</>
        )}
      </div>
    </>
  );
};

export default PictureView;

// const [currentImage, setCurrentImage] = useState(0);
// const [viewerIsOpen, setViewerIsOpen] = useState(false);
// import Carousel, { Modal, ModalGateway } from 'react-images';
// const openLightbox = useCallback((event, { photo, index }) => {
//   setCurrentImage(index);
//   setViewerIsOpen(true);
// }, []);

// const closeLightbox = () => {
//   setCurrentImage(0);
//   setViewerIsOpen(false);
// };
/*onClick={openLightbox} */
/* <ModalGateway>
  {viewerIsOpen ? (
    <Modal onClose={closeLightbox}>
      <Carousel currentIndex={currentImage} views={data} />
    </Modal>
  ) : null}
</ModalGateway> */
