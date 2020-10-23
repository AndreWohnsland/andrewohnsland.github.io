import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import InfoBox from './Forms/InfoBox';
import Dropdown from './Forms/Dropdown';
import { getAndGenerateImageDetails, deleteImage } from '../../util/apiHelper';
import CaptionBanner from '../CaptionBanner';

const PictureDelete = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [res, setRes] = useState('');
  const [messageTitle, setmessageTitle] = useState('');
  const [imageId, setImageId] = useState('noId');
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    loadElements();
  }, []);

  const loadElements = async () => {
    const imageData = await getAndGenerateImageDetails();
    setImageList(imageData);
  };

  const validateSubmit = () => {
    return imageId !== 'noId';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    deleteImage(imageId).then((res) => {
      setRes(res);
      setmessageTitle(`Image with id: ${imageId}`);
      setShowMessage(true);
      if (res.statusText === 'OK') {
        setImageId('');
        loadElements();
      }
    });
  };

  const handleMessage = () => {
    setShowMessage(!showMessage);
  };

  return (
    <div>
      <CaptionBanner text='Delete Image' />
      <div className='main-text'>
        {showMessage && <InfoBox res={res} name={messageTitle} handleShow={handleMessage} />}
        <div className='user-form-container'>
          <form onSubmit={onSubmit}>
            <Dropdown
              label='Select image to delete'
              value={imageId}
              onChange={(e) => setImageId(e.target.value)}
              options={imageList}
            />
            <Button type='submit' disabled={!validateSubmit()}>
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PictureDelete;
