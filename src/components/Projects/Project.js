import React, { Component } from 'react';
import tmpData from '../../dummydata/tmp';

class Project extends Component {
  state = { project: null };

  componentDidMount() {
    let id = this.props.match.params.project_id;
    let project = tmpData.find((project) => project.id === parseInt(id));
    this.setState({
      project,
    });
  }

  render() {
    return this.state.project ? (
      <>
        <div className='text-center main-header'>
          <h1>{this.state.project.title}</h1>
        </div>
        <br />
        <div className='main-text'>
          <p>{this.state.project.description}</p>
          <p>
            Interested? Look into the project at <a href={this.state.project.projectLink}>Github.</a>
          </p>
        </div>
      </>
    ) : (
      <div className='text-center main-header'>
        <h1>No valid Project id :(</h1>
      </div>
    );
  }
}

export default Project;
