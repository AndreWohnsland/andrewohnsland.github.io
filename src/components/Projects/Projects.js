import React from 'react';
import { useQuery } from 'react-query';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const fetchProjects = async () => {
    const res = await fetch('http://localhost:5000/api/project');
    return res.json();
  };

  const { data, status } = useQuery('projects', fetchProjects, { staleTime: 60000, cacheTime: 3600000 });
  return (
    <>
      <div className='text-center main-header'>
        <h1>My Projects</h1>
      </div>
      <br />
      <div className='main-text'>
        {status === 'loading' && <p>Loading projects ....</p>}
        {status === 'error' && <p>Error fetching data!</p>}
        {status === 'success' &&
          data.map((project) => {
            return <ProjectCard key={project._id} project={project} />;
          })}
      </div>
    </>
  );
};

export default Projects;
