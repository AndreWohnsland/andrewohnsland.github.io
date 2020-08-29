import React, { Component } from 'react';
import axios from 'axios';

class ProjectEdit extends Component {
  state = {
    projects: null,
    projectId: '',
    title: '',
    description: '',
    text: '',
    link: '',
  };

  componentDidMount() {
    this.loadProjects();
  }

  loadProjects = () => {
    axios.get('http://localhost:5000/api/project').then((res) => {
      console.log(res.data);
      this.setState({ projects: res.data });
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  handleAnyChange = (e) => {
    this.setState({
      [e.targe.name]: e.target.value,
    });
  };

  selectProject = (e) => {
    let selectedProject = this.state.projects.filter((project) => {
      return project._id === e.target.value;
    })[0];
    if (selectedProject === undefined) {
      selectedProject = {
        projectId: '',
        title: '',
        description: '',
        text: '',
        link: '',
      };
    }
    this.setState({
      projectId: e.target.value,
      title: selectedProject.title,
      description: selectedProject.description,
      text: selectedProject.text,
      link: selectedProject.link,
    });
  };

  handleSelect = (value) => console.log(value);

  render() {
    let options = [{ name: 'Add New Project', value: '' }];
    if (this.state.projects) {
      options.push(...this.state.projects.map((project) => ({ name: project.title, value: project._id })));
    }
    return (
      <div>
        <div className='main-header text-center'>
          <h1>Edit Project Entries</h1>
        </div>
        <br />
        <div className='main-text'>
          <form onSubmit={this.onSubmit}>
            <div>
              <label>Select your project:</label>
              <select required className='form-control' value={this.state.projectId} onChange={this.selectProject}>
                {options.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <br />
            <div className='form-group'>
              <label>Project Title:</label>
              <input
                type='text'
                name='title'
                required
                className='form-control'
                value={this.state.title}
                onChange={this.handleAnyChange}
              />
            </div>
            <div className='form-group'>
              <label>Description:</label>
              <input
                type='text'
                name='description'
                required
                className='form-control'
                value={this.state.description}
                onChange={this.handleAnyChange}
              />
            </div>
            <div className='form-group'>
              <label>Link:</label>
              <input
                type='text'
                name='link'
                required
                className='form-control'
                value={this.state.link}
                onChange={this.handleAnyChange}
              />
            </div>
            <div className='form-group'>
              <label>Text:</label>
              <textarea
                rows='8'
                type='text'
                name='text'
                required
                className='form-control'
                value={this.state.text}
                onChange={this.handleAnyChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='submit'
                value={this.state.projectId === '' ? 'Create' : 'Change'}
                className='btn btn-primary'
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ProjectEdit;
