import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Dropdown from './Forms/Dropdown';
import TextInput from './Forms/TextInput';
import TextArea from './Forms/TextArea';
import InfoBox from './Forms/InfoBox';
import { AuthContext } from '../../contexts/AuthContext';

class EditComponent extends Component {
  static contextType = AuthContext;
  state = {
    elements: null,
    elementId: '',
    title: '',
    description: '',
    text: '',
    link: '',
    showMessage: false,
    res: null,
    messageTitle: '',
  };

  validateSubmit = () => {
    const { link, title, description, text } = this.state;
    return (
      title.length > 0 &&
      description.length > 0 &&
      text.length > 0 &&
      (this.props.elementType === 'project' ? link.length > 0 : true)
    );
  };

  handleMessage = () => {
    this.setState({ showMessage: !this.state.showMessage });
  };

  clearState = () => {
    this.setState({
      elementId: '',
      title: '',
      description: '',
      text: '',
      link: '',
    });
  };

  componentDidMount() {
    this.loadElements();
  }

  loadElements = () => {
    axios.get(`http://localhost:5000/api/${this.props.elementType}`).then((res) => {
      this.setState({ elements: res.data });
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let response = null;
    const { elementId, title, description, text, link } = this.state;
    const dataToSend = { elementId, title, description, text, link };
    response = await this.postElement(dataToSend);
    this.setState({ res: response, showMessage: true, messageTitle: title });
    if (response.statusText === 'OK') {
      this.clearState();
      this.loadElements();
    }
  };

  postElement = async (dataToSend) => {
    let link = this.generateLink();
    let response = await axios
      .post(link, dataToSend, { withCredentials: true, validateStatus: () => true })
      .then((res) => {
        return res;
      });
    return response;
  };

  generateLink = () => {
    const { elementId } = this.state;
    if (elementId) {
      return `http://localhost:5000/api/${this.props.elementType}/update/${elementId}`;
    } else {
      return `http://localhost:5000/api/${this.props.elementType}/add`;
    }
  };

  handleAnyChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  selectElement = (e) => {
    const { elements } = this.state;
    const { elementType } = this.props;
    let selectedElement = elements.filter((element) => {
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
      });
    }
  };

  capitalizeElement = () => {
    const { elementType } = this.props;
    return elementType.charAt(0).toUpperCase() + elementType.slice(1);
  };

  render() {
    const { isAuth } = this.context;
    const { elements, showMessage, res, messageTitle, title, description, link, text, elementId } = this.state;
    const { elementType } = this.props;
    const { capitalizeElement, handleMessage, selectElement, handleAnyChange, validateSubmit, onSubmit } = this;
    let options = [{ name: `Add new ${capitalizeElement()}`, value: '' }];
    if (elements) {
      options.push(...elements.map((element) => ({ name: element.title, value: element._id })));
    }
    return (
      <div>
        <div className='main-header text-center'>
          <h1>Edit {capitalizeElement()} Entries</h1>
        </div>
        <div className='main-text'>
          {isAuth ? (
            <>
              {showMessage && <InfoBox res={res} name={messageTitle} handleShow={handleMessage} />}
              <div className='user-form-container'>
                <form onSubmit={onSubmit}>
                  <Dropdown
                    label={`Select your ${elementType}`}
                    value={elementId}
                    onChange={selectElement}
                    options={options}
                  />
                  <TextInput label={'Title'} name={'title'} value={title} onChange={handleAnyChange} />
                  <TextInput
                    label={'Description'}
                    name={'description'}
                    value={description}
                    onChange={handleAnyChange}
                  />
                  {elementType === 'project' && (
                    <TextInput label={'Link'} name={'link'} value={link} onChange={handleAnyChange} />
                  )}
                  <TextArea label={'Text'} name={'text'} value={text} onChange={handleAnyChange} />
                  <Button type='submit' disabled={!validateSubmit()}>
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
