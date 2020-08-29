import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div key={project._id}>
      <Link to={`/project/${project._id}`} style={{ textDecoration: 'none' }}>
        <div className="card-div">
          <div className="card-content">
            <h3 className="card-title">{project.title}</h3>
            <p className="card-desc">{project.description}</p>
          </div>
        </div>
      </Link>
      <br />
    </div>
  );
};

export default ProjectCard;
