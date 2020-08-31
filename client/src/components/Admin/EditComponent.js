import React, { Component } from 'react';
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
    console.log(this.state);
    let response = null;
    if (this.state.elementId) {
      response = await this.updateExistingElement();
    } else {
      response = await this.createNewElement();
    }
    console.log(response.status, response.statusText, response.data);
    this.setState({ res: response, showMessage: true, messageTitle: this.state.title });
    if (response.statusText === 'OK') {
      this.clearState();
      this.loadElements();
    }
  };

  createNewElement = async () => {
    let link = `http://localhost:5000/api/${this.props.elementType}/add`;
    let response = await axios
      .post(link, this.state, { withCredentials: true, validateStatus: () => true })
      .then((res) => {
        return res;
      });
    return response;
  };

  updateExistingElement = async () => {
    let link = `http://localhost:5000/api/${this.props.elementType}/update/${this.state.elementId}`;
    let response = await axios
      .post(link, this.state, { withCredentials: true, validateStatus: () => true })
      .then((res) => {
        return res;
      });
    return response;
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
        <br />
        <div className='main-text'>
          {isAuth ? (
            <>
              {this.state.showMessage && (
                <>
                  <InfoBox res={this.state.res} name={this.state.messageTitle} handleShow={this.handleMessage} /> <br />{' '}
                </>
              )}
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
                <div className='form-group'>
                  <input
                    type='submit'
                    value={this.state.elementId === '' ? 'Create' : 'Change'}
                    className='btn btn-primary'
                  />
                </div>
              </form>
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
