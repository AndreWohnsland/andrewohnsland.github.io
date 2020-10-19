import React, { useState } from 'react';
import TextInput from './Forms/TextInput';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const jpegType = 'image/jpeg';

const PictureUpload = () => {
  const [description, setdescription] = useState('');
  const [name, setname] = useState('');
  const [image, setimage] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', image);
    data.append('name', name);
    data.append('description', description);
    console.log(data);
    axios
      .post('http://localhost:5000/api/image/add', data, { withCredentials: true, validateStatus: () => true })
      .then((res) => console.log(res));
  };

  return (
    <div>
      <div className='main-header text-center'>
        <h1>Edit Image Entries</h1>
      </div>
      <div className='main-text'>
        <div className='user-form-container'>
          <form onSubmit={onSubmit}>
            <TextInput
              label={'Description'}
              name={'description'}
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
            <TextInput label={'Name'} name={'name'} value={name} onChange={(e) => setname(e.target.value)} />
            <Form.Group>
              <Form.Label>
                <span>Please select picture</span>
              </Form.Label>
              <Form.File
                name='uploadImage'
                required
                accept={`${jpegType}`}
                onChange={(e) => setimage(e.target.files[0])}
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
