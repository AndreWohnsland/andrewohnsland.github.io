import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Dropdown from './Forms/Dropdown';
import TextInput from './Forms/TextInput';
import TextArea from './Forms/TextArea';
import InfoBox from './Forms/InfoBox';
import Checkbox from './Forms/Checkbox';
import { AuthContext } from '../../contexts/AuthContext';
import CaptionBanner from '../CaptionBanner';
import {
  getElementsAsAdmin,
  addElement,
  updateElement,
} from '../../util/apiHelper';

class EditComponent extends Component {
  // eslint-disable-next-line react/static-property-placement
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      elements: null,
      elementId: '',
      title: '',
      description: '',
      text: '',
      link: '',
      draft: false,
      showMessage: false,
      res: null,
      messageTitle: '',
    };
  }

  componentDidMount() {
    this.loadElements();
    document.title = 'Admin | Andre Wohnsland';
  }

  validateSubmit = () => {
    const { link, title, description, text } = this.state;
    const { elementType } = this.props;
    return (
      title.length > 0 &&
      description.length > 0 &&
      text.length > 0 &&
      (elementType === 'project' ? link.length > 0 : true)
    );
  };

  handleMessage = () => {
    this.setState((prevState) => ({ showMessage: !prevState.showMessage }));
  };

  clearState = () => {
    this.setState({
      elementId: '',
      title: '',
      description: '',
      text: '',
      link: '',
      draft: false,
    });
  };

  loadElements = async () => {
    const { elementType } = this.props;
    const elementData = await getElementsAsAdmin(elementType);
    this.setState({ elements: elementData });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let response = null;
    const { elementId, title, description, text, link, draft } = this.state;
    const dataToSend = { elementId, title, description, text, link, draft };
    response = await this.selectApiOption(dataToSend);
    this.setState({ res: response, showMessage: true, messageTitle: title });
    if (response.statusText === 'OK') {
      this.clearState();
      this.loadElements();
    }
  };

  selectApiOption = (dataToSend) => {
    const { elementId } = this.state;
    const { elementType } = this.props;
    if (elementId) {
      return updateElement(dataToSend, elementType, elementId);
    }
    return addElement(dataToSend, elementType);
  };

  handleAnyChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCheckboxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  };

  selectElement = (e) => {
    const { elements } = this.state;
    const { elementType } = this.props;
    const selectedElement = elements.filter((element) => {
      return element._id === e.target.value;
    })[0];
    if (selectedElement === undefined) {
      this.clearState();
    } else {
      const link = elementType === 'project' ? selectedElement.link : '';
      this.setState({
        elementId: e.target.value,
        title: selectedElement.title,
        description: selectedElement.description,
        text: selectedElement.text,
        link,
        draft: selectedElement.draft,
      });
    }
  };

  capitalizeElement = () => {
    const { elementType } = this.props;
    return elementType.charAt(0).toUpperCase() + elementType.slice(1);
  };

  render() {
    const { isAuth } = this.context;
    const {
      elements,
      showMessage,
      res,
      messageTitle,
      title,
      description,
      link,
      text,
      elementId,
      draft,
    } = this.state;
    const { elementType } = this.props;
    const {
      capitalizeElement,
      handleMessage,
      selectElement,
      handleAnyChange,
      handleCheckboxChange,
      validateSubmit,
      onSubmit,
    } = this;
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
                    onChange={handleAnyChange}
                  />
                  <TextInput
                    label="Description"
                    name="description"
                    value={description}
                    onChange={handleAnyChange}
                  />
                  {elementType === 'project' && (
                    <TextInput
                      label="Link"
                      name="link"
                      value={link}
                      onChange={handleAnyChange}
                    />
                  )}
                  <Checkbox
                    label="This is currently a draft (will not be shown public)"
                    name="draft"
                    value={draft}
                    onChange={handleCheckboxChange}
                  />
                  <TextArea
                    label="Text"
                    name="text"
                    value={text}
                    onChange={handleAnyChange}
                  />
                  <Button type="submit" disabled={!validateSubmit()}>
                    {elementId === '' ? 'Create' : 'Change'}
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <p>Not authentificated!</p>
          )}
        </div>
      </div>
    );
  }
}

export default EditComponent;
