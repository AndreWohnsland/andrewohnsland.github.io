import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { AxiosResponse } from 'axios';
import Dropdown from './Forms/Dropdown';
import TextInput from './Forms/TextInput';
import TextArea from './Forms/TextArea';
import InfoBox from './Forms/InfoBox';
import Checkbox from './Forms/Checkbox';
import { AuthContext } from '../../contexts/AuthContext';
import CaptionBanner from '../CaptionBanner';
import CategorySelect from './Forms/CategorySelect';
import {
  getElements,
  addElement,
  updateElement,
  deleteElement,
  getAllCategories,
} from '../../util/apiHelper';
import { IElement, IElementPost } from '../../Interfaces/element.interface';
import confirmAlert from './Forms/ConfirmAlert';
import BlogResources from './BlogResources';

type EditComponentProps = {
  elementType: string;
};

const EditComponent: React.FC<EditComponentProps> = ({ elementType }) => {
  const { isAuth } = useContext(AuthContext);

  const [elements, setElements] = useState<IElement[]>([]);
  const [elementId, setElementId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [draft, setDraft] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [res, setRes] = useState<AxiosResponse | undefined>(undefined);
  const [messageTitle, setMessageTitle] = useState('');
  const [category, setCategory] = useState<string[]>([]);
  const [existingCats, setExistingCats] = useState<string[]>([]);

  const clearState = () => {
    setElementId('');
    setTitle('');
    setDescription('');
    setText('');
    setLink('');
    setDraft(false);
    setCategory([]);
  };

  const loadElements = useCallback(async () => {
    clearState();
    const elementData = await getElements(elementType, true);
    const existingCatData = await getAllCategories(elementType);
    setElements(elementData);
    setExistingCats(existingCatData);
  }, [elementType]);

  useEffect(() => {
    loadElements();
    document.title = `Admin | ${process.env.REACT_APP_SHOWN_NAME}`;
  }, [loadElements]);

  const validateSubmit = () => {
    return (
      title.length > 0 &&
      description.length > 0 &&
      text.length > 0 &&
      (elementType === 'project' ? link.length > 0 : true)
    );
  };

  const validateDelete = () => {
    return elementId !== '';
  };

  const handleMessage = () => {
    setShowMessage(!showMessage);
  };

  const selectApiOption = (dataToSend: IElementPost) => {
    if (elementId) {
      return updateElement(dataToSend, elementType, elementId);
    }
    return addElement(dataToSend, elementType);
  };

  const setNotification = (response: AxiosResponse) => {
    setRes(response);
    setShowMessage(true);
    setMessageTitle(title);
    if (response.statusText === 'OK') {
      clearState();
      setExistingCats([]);
      loadElements();
    }
  };

  const handelDelete = async () => {
    const response = await deleteElement(elementType, elementId);
    setNotification(response);
  };

  const runDelete = () => {
    const prompt = `Do you want to delete '${title}'?`;
    confirmAlert(prompt, handelDelete);
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let response = null;
    const dataToSend = {
      elementId,
      title,
      description,
      text,
      link,
      draft,
      category,
    };
    response = await selectApiOption(dataToSend);
    setNotification(response);
  };

  const selectElement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedElement = elements.filter((element) => {
      return element._id === e.target.value;
    })[0];
    if (selectedElement === undefined) {
      clearState();
    } else {
      let selectedLink = '';
      if (elementType === 'project' && selectedElement.link) {
        selectedLink = selectedElement.link;
      }
      setElementId(e.target.value);
      setTitle(selectedElement.title);
      setDescription(selectedElement.description);
      setText(selectedElement.text);
      setLink(selectedLink);
      setDraft(selectedElement.draft);
      setCategory(selectedElement.category);
    }
  };

  const capitalizeElement = () => {
    return elementType.charAt(0).toUpperCase() + elementType.slice(1);
  };

  const options = [{ name: `Add new ${capitalizeElement()}`, value: '' }];
  if (elements) {
    options.push(
      ...elements.map((element) => ({
        name: element.title,
        value: element._id,
      }))
    );
  }
  return (
    <div>
      <CaptionBanner text={`Edit ${capitalizeElement()} Entries`} />
      <div className="main-text">
        {isAuth ? (
          <>
            {showMessage && (
              <InfoBox
                res={res}
                name={messageTitle}
                handleShow={handleMessage}
              />
            )}
            <div className="user-form-container">
              <h3 className="user-form-header">{`Manage ${capitalizeElement()} Content`}</h3>
              <form onSubmit={onSubmit}>
                <Dropdown
                  label={`Select your ${elementType}`}
                  value={elementId}
                  onChange={selectElement}
                  options={options}
                />
                <TextInput
                  label="Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextInput
                  label="Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {elementType === 'project' && (
                  <TextInput
                    label="Link"
                    name="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                )}
                <Checkbox
                  label="This is currently a draft (will not be shown public)"
                  name="draft"
                  value={draft}
                  onChange={(e) => setDraft(e.target.checked)}
                />
                <CategorySelect
                  name="catselect"
                  categories={category}
                  existingCategories={existingCats}
                  setCategories={setCategory}
                />
                <TextArea
                  label="Text"
                  name="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Button type="submit" disabled={!validateSubmit()}>
                  {elementId === '' ? 'Create' : 'Change'}
                </Button>
                <Button
                  variant="danger"
                  className="align-right"
                  disabled={!validateDelete()}
                  onClick={runDelete}
                >
                  Delete
                </Button>
              </form>
            </div>
            {elementType === 'blog' && <BlogResources blogId={elementId} />}
          </>
        ) : (
          <p>Not authentificated!</p>
        )}
      </div>
    </div>
  );
};

export default EditComponent;
