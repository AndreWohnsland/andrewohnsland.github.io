import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AxiosResponse } from 'axios';
import TextInput from './Forms/TextInput';
import InfoBox from './Forms/InfoBox';
import Dropdown from './Forms/Dropdown';
import CaptionBanner from '../CaptionBanner';
import { postImage } from '../../util/apiHelper';

const jpegType = 'image/jpeg';

const PictureUpload: React.FC = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState('fotography');
  const [showMessage, setShowMessage] = useState(false);
  const [res, setRes] = useState<AxiosResponse | undefined>(undefined);
  const [messageTitle, setmessageTitle] = useState('');

  useEffect(() => {
    document.title = 'Admin | Andre Wohnsland';
  }, []);

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

  const clearState = () => {
    setName('');
    setImage(null);
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', image as any);
    data.append('name', name);
    data.append('category', category);
    postImage(data).then((response) => {
      setRes(response);
      setShowMessage(true);
      setmessageTitle(name);
      clearState();
    });
  };

  return (
    <div>
      <CaptionBanner text="Add Image" />
      <div className="main-text">
        {showMessage && (
          <InfoBox res={res} name={messageTitle} handleShow={handleMessage} />
        )}
        <div className="user-form-container">
          <form onSubmit={onSubmit}>
            <TextInput
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Dropdown
              label="Select category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={categoryOptions}
            />
            <Form.Group>
              <Form.File
                name="uploadImage"
                label="Please select picture"
                required
                accept={`${jpegType}`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setImage(e.target.files === null ? null : e.target.files[0])
                }
              />
            </Form.Group>
            <Button type="submit" disabled={!validateSubmit()}>
              Upload
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PictureUpload;
