import React, { useState } from 'react';
import TextInput from './Forms/TextInput';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import InfoBox from './Forms/InfoBox';

const jpegType = 'image/jpeg';

const PictureUpload = () => {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [res, setRes] = useState('');
  const [messageTitle, setmessageTitle] = useState('');

  const handleMessage = () => {
    setShowMessage(!showMessage);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', image);
    data.append('name', name);
    data.append('description', description);
    axios
      .post('http://localhost:5000/api/image/add', data, { withCredentials: true, validateStatus: () => true })
      .then((res) => {
        setRes(res);
        setShowMessage(true);
        setmessageTitle(name);
        clearState();
      });
  };

  const clearState = () => {
    setDescription('');
    setName('');
    setImage(null);
  };

  return (
    <div>
      <div className='main-header text-center'>
        <h1>Edit Image Entries</h1>
      </div>
      <div className='main-text'>
        {showMessage && (
          <>
            <InfoBox res={res} name={messageTitle} handleShow={handleMessage} />
            <br />
          </>
        )}
        <div className='user-form-container'>
          <form onSubmit={onSubmit}>
            <TextInput
              label={'Description'}
              name={'description'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextInput label={'Name'} name={'name'} value={name} onChange={(e) => setName(e.target.value)} />
            <Form.Group>
              <Form.Label>
                <span>Please select picture</span>
              </Form.Label>
              <Form.File
                name='uploadImage'
                required
                accept={`${jpegType}`}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Button type='submit'>Upload</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PictureUpload;
