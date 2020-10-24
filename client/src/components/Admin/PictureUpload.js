import React, { useState } from 'react';
import TextInput from './Forms/TextInput';
import { Form, Button } from 'react-bootstrap';
import InfoBox from './Forms/InfoBox';
import Dropdown from './Forms/Dropdown';
import CaptionBanner from '../CaptionBanner';
import { postImage } from '../../util/apiHelper';

const jpegType = 'image/jpeg';

const PictureUpload = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('fotography');
  const [showMessage, setShowMessage] = useState(false);
  const [res, setRes] = useState('');
  const [messageTitle, setmessageTitle] = useState('');

  const categoryOptions = [
    { value: 'fotography', name: 'Fotography' },
    { value: 'woodwork', name: 'Woodwork' },
  ];

  const validateSubmit = () => {
    return name.length > 0 && image !== null;
  };

  const handleMessage = () => {
    setShowMessage(!showMessage);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', image);
    data.append('name', name);
    data.append('category', category);
    postImage(data).then((res) => {
      setRes(res);
      setShowMessage(true);
      setmessageTitle(name);
      clearState();
    });
  };

  const clearState = () => {
    setName('');
    setImage(null);
  };

  return (
    <div>
      <CaptionBanner text='Add Image' />
      <div className='main-text'>
        {showMessage && <InfoBox res={res} name={messageTitle} handleShow={handleMessage} />}
        <div className='user-form-container'>
          <form onSubmit={onSubmit}>
            <TextInput label='Name' name='name' value={name} onChange={(e) => setName(e.target.value)} />
            <Dropdown
              label={`Select category`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={categoryOptions}
            />
            <Form.Group>
              <Form.File
                name='uploadImage'
                label='Please select picture'
                required
                accept={`${jpegType}`}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Button type='submit' disabled={!validateSubmit()}>
              Upload
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PictureUpload;
