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
    const dataToSend = {
      elementId: this.state.elementId,
      title: this.state.title,
      description: this.state.description,
      text: this.state.text,
      link: this.state.link,
    };
    response = await this.postElement(dataToSend);
    this.setState({ res: response, showMessage: true, messageTitle: this.state.title });
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
    if (this.state.elementId) {
      return `http://localhost:5000/api/${this.props.elementType}/update/${this.state.elementId}`;
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
    let selectedElement = this.state.elements.filter((element) => {
      return element._id === e.target.value;
    })[0];
    if (selectedElement === undefined) {
      this.clearState();
    } else {
      let link = this.props.elementType === 'project' ? selectedElement.link : '';
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
    let element = this.props.elementType;
    return element.charAt(0).toUpperCase() + element.slice(1);
  };

  render() {
    const { isAuth } = this.context;
    let options = [{ name: `Add new ${this.capitalizeElement()}`, value: '' }];
    if (this.state.elements) {
      options.push(...this.state.elements.map((element) => ({ name: element.title, value: element._id })));
    }
    return (
      <div>
        <div className='main-header text-center'>
          <h1>Edit {this.capitalizeElement()} Entries</h1>
        </div>
        <div className='main-text'>
          {isAuth ? (
            <>
              {this.state.showMessage && (
                <>
                  <InfoBox res={this.state.res} name={this.state.messageTitle} handleShow={this.handleMessage} /> <br />{' '}
                </>
              )}
              <div className='user-form-container'>
                <form onSubmit={this.onSubmit}>
                  <Dropdown
                    label={'Select your project'}
                    value={this.state.elementId}
                    onChange={this.selectElement}
                    options={options}
                  />
                  <TextInput label={'Title'} name={'title'} value={this.state.title} onChange={this.handleAnyChange} />
                  <TextInput
                    label={'Description'}
                    name={'description'}
                    value={this.state.description}
                    onChange={this.handleAnyChange}
                  />
                  {this.props.elementType === 'project' && (
                    <TextInput label={'Link'} name={'link'} value={this.state.link} onChange={this.handleAnyChange} />
                  )}
                  <TextArea label={'Text'} name={'text'} value={this.state.text} onChange={this.handleAnyChange} />
                  <Button type='submit'>{this.state.elementId === '' ? 'Create' : 'Change'}</Button>
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
