import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';

const PictureView = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const fetchpictures = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/image`);
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
  const { data, status } = useQuery('pictures', fetchpictures, { staleTime: 120000, cacheTime: 3600000 });

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div>
      <div className='text-center main-header'>
        <h1>Pictures</h1>
      </div>
      <div className='main-text-picture'>
        {status === 'loading' && <p>Loading ....</p>}
        {status === 'error' && <p>Error fetching data!</p>}
        {status === 'success' && (
          <div>
            <Gallery photos={data} direction={'column'} onClick={openLightbox} />
            <ModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel currentIndex={currentImage} views={data} />
                </Modal>
              ) : null}
            </ModalGateway>
          </div>
        )}
      </div>
    </div>
  );
};

export default PictureView;
