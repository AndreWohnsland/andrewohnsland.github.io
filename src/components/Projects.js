import React from 'react';
import { Link } from 'react-router-dom';

const Projects = ({ projects }) => {
  const projectlist = projects.map((project) => {
    return (
      <div key={project.id}>
        <Link to={`/project/${project.id}`} style={{ textDecoration: 'none' }}>
          <div className='card-div'>
            <div className='card-content'>
              <h3 className='card-title'>{project.title}</h3>
              <p className='card-desc'>{project.shortDescription}</p>
            </div>
          </div>
        </Link>
        <br />
      </div>
    );
  });

  return (
    <>
      <div className='text-center main-header'>
        <h1>My Projects</h1>
      </div>
      <br />
      <div className='main-text'>{projectlist}</div>
    </>
  );
};

export default Projects;
