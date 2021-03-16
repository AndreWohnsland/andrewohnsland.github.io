import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AxiosResponse } from 'axios';
import InfoBox from './Forms/InfoBox';
import Dropdown from './Forms/Dropdown';
import { getAndGenerateImageDetails, deleteImage } from '../../util/apiHelper';
import CaptionBanner from '../CaptionBanner';
import { IImageReducedDetails } from '../../Interfaces/image.interface';

const PictureDelete: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [res, setRes] = useState<AxiosResponse | undefined>(undefined);
  const [messageTitle, setmessageTitle] = useState('');
  const [imageId, setImageId] = useState('noId');
  const [imageList, setImageList] = useState<IImageReducedDetails[]>([]);

  const loadElements = async (): Promise<void> => {
    const imageData = await getAndGenerateImageDetails();
    setImageList(imageData);
  };

  useEffect(() => {
    loadElements();
    document.title = 'Admin | Andre Wohnsland';
  }, []);

  const validateSubmit = () => {
    return imageId !== 'noId';
  };

  const onSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    deleteImage(imageId).then((response) => {
      setRes(response);
      setmessageTitle(`Image with id: ${imageId}`);
      setShowMessage(true);
      if (response.statusText === 'OK') {
        setImageId('');
        loadElements();
      }
    });
  };

  const handleMessage = (): void => {
    setShowMessage(!showMessage);
  };

  return (
    <div>
      <CaptionBanner text="Delete Image" />
      <div className="main-text">
        {showMessage && (
          <InfoBox res={res} name={messageTitle} handleShow={handleMessage} />
        )}
        <div className="user-form-container">
          <form onSubmit={onSubmit}>
            <Dropdown
              label="Select image to delete"
              value={imageId}
              onChange={(e) => setImageId(e.target.value)}
              options={imageList}
            />
            <Button type="submit" disabled={!validateSubmit()}>
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PictureDelete;
