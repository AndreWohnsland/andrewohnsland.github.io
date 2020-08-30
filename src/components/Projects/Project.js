import React from 'react';
import { useQuery } from 'react-query';

const Project = (props) => {
  let id = props.match.params.project_id;

  const fetchProject = async () => {
    const res = await fetch(`http://localhost:5000/api/project/${id}`);
    return res.json();
  };

  const { data, status } = useQuery(`project?id=${id}`, fetchProject, { staleTime: 100000, cacheTime: 3600000 });

  return (
    <>
      <div className='text-center main-header'>
        <h1>
          {status === 'loading' && 'Loading projects ....'}
          {status === 'error' && 'Error fetching data!'}
          {status === 'success' && data.title}
        </h1>
      </div>
      <br />
      <div className='main-text'>
        {status === 'error' && 'Probably not a valid id :('}
        {status === 'success' && (
          <>
            <p>{data.text}</p>
            <p>
              Interested? Look into the project at <a href={data.link}>Github.</a>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Project;
