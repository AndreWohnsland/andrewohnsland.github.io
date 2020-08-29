import React, { Component } from 'react';
import axios from 'axios';
import Dropdown from './Forms/Dropdown';
import TextInput from './Forms/TextInput';
import TextArea from './Forms/TextArea';

class EditComponent extends Component {
  state = {
    elements: null,
    elementId: '',
    title: '',
    description: '',
    text: '',
    link: '',
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
    this.loadProjects();
  }

  loadElements = () => {
    axios.get(`http://localhost:5000/api/${this.props.elementType}`).then((res) => {
      this.setState({ elements: res.data });
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.clearState();
    this.loadProjects();
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
        </div>
      </div>
    );
  }
}

export default EditComponent;
