import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import InfoBox from './Forms/InfoBox';
import Dropdown from './Forms/Dropdown';
import axios from 'axios';

const PictureDelete = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [res, setRes] = useState('');
  const [messageTitle, setmessageTitle] = useState('');
  const [imageId, setImageId] = useState('noId');
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    loadElements();
  }, []);

  const validateSubmit = () => {
    return imageId !== 'noId';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/image/delete/${imageId}`, {
        withCredentials: true,
        validateStatus: () => true,
      })
      .then((res) => {
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

  const loadElements = () => {
    axios.get(`http://localhost:5000/api/image/all/details`).then((res) => {
      const start = [{ name: 'Select image', value: 'noId' }];
      const imgList = res.data.map((img) => {
        const suff = img.category !== undefined ? ` (${img.category})` : '';
        return {
          name: `${img.name}${suff}`,
          value: img._id,
        };
      });
      setImageList([...start, ...imgList]);
    });
  };

  return (
    <div>
      <div className='main-header text-center'>
        <h1>Delete Image</h1>
      </div>
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
