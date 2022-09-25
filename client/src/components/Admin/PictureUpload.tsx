import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AxiosResponse } from 'axios';
import TextInput from './Forms/TextInput';
import InfoBox from './Forms/InfoBox';
import CaptionBanner from '../CaptionBanner';
import { postImage, getAllCategories } from '../../util/apiHelper';

const jpegType = 'image/jpeg';

const PictureUpload: React.FC = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [res, setRes] = useState<AxiosResponse | undefined>(undefined);
  const [messageTitle, setmessageTitle] = useState('');
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

  const loadCats = async () => {
    const cats = await getAllCategories('image');
    setCategoryOptions(cats);
  };

  useEffect(() => {
    document.title = `Admin | ${process.env.REACT_APP_SHOWN_NAME}`;
    loadCats();
  }, []);

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
      loadCats();
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
            <TextInput
              label="Category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <div className="available-categories">
              <p style={{ marginBottom: '6px' }}>Existing:&nbsp;&nbsp;</p>
              {categoryOptions.map((c) => (
                <Button
                  onClick={() => setCategory(c)}
                  className="available-categories"
                  variant="primary"
                  size="sm"
                  key={c}
                >
                  {c}
                </Button>
              ))}
            </div>
            <Form.Group className="element-form-group">
              <Form.Label>Picture</Form.Label>
              <Form.Control
                type="file"
                name="uploadImage"
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
