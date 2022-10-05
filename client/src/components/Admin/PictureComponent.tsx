import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AxiosResponse } from 'axios';
import TextInput from './Forms/TextInput';
import InfoBox from './Forms/InfoBox';
import Dropdown from './Forms/Dropdown';
import {
  getAndGenerateImageDetails,
  deleteImage,
  postImage,
  getAllCategories,
} from '../../util/apiHelper';
import CaptionBanner from '../CaptionBanner';
import { IImageReducedDetails } from '../../Interfaces/image.interface';
import confirmAlert from './Forms/ConfirmAlert';

const jpegType = 'image/jpeg';

const PictureComponent: React.FC = () => {
  // for upload
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  // for delete
  const [imageId, setImageId] = useState('');
  const [imageList, setImageList] = useState<IImageReducedDetails[]>([]);
  // For the popup
  const [showMessage, setShowMessage] = useState(false);
  const [res, setRes] = useState<AxiosResponse | undefined>(undefined);
  const [messageTitle, setmessageTitle] = useState('');

  const loadCats = async () => {
    const cats = await getAllCategories('image');
    setCategoryOptions(cats);
  };

  const loadElements = async (): Promise<void> => {
    const imageData = await getAndGenerateImageDetails();
    setImageList(imageData);
  };

  useEffect(() => {
    document.title = `Admin | ${process.env.REACT_APP_SHOWN_NAME}`;
    loadCats();
    loadElements();
  }, []);

  const validateUpload = () => {
    return name.length > 0 && image !== null;
  };

  const validateDelete = () => {
    return imageId !== '';
  };

  const handleMessage = () => {
    setShowMessage(!showMessage);
  };

  const clearUpload = () => {
    setName('');
    setImage(null);
    setCategory('');
  };

  const submitUpload = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = new FormData();
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    data.append('file', image as any);
    data.append('name', name);
    data.append('category', category);
    postImage(data).then((response) => {
      setRes(response);
      setShowMessage(true);
      setmessageTitle(name);
      if (response.statusText === 'OK') {
        clearUpload();
        loadCats();
        loadElements();
      }
    });
  };

  const handleDeleteImage = () => {
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

  const submitDelete = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const prompt = `Do you want to delete the image?`;
    confirmAlert(prompt, handleDeleteImage);
  };

  return (
    <div>
      <CaptionBanner text="Manage Images" />
      <div className="main-text">
        {showMessage && (
          <InfoBox res={res} name={messageTitle} handleShow={handleMessage} />
        )}
        <div className="user-form-container">
          <h3 className="user-form-header">Upload Image</h3>
          <form onSubmit={submitUpload}>
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
            <Button type="submit" disabled={!validateUpload()}>
              Upload
            </Button>
          </form>
        </div>
        <div className="user-form-container">
          <h3 className="user-form-header">Delete Image</h3>
          <form onSubmit={submitDelete}>
            <Dropdown
              label="Select image to delete"
              value={imageId}
              onChange={(e) => setImageId(e.target.value)}
              options={imageList}
            />
            <Button type="submit" variant="danger" disabled={!validateDelete()}>
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PictureComponent;
