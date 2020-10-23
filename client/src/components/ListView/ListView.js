import React from 'react';
import { useQuery } from 'react-query';
import ElementCard from './ElementCard';
import CaptionBanner from '../CaptionBanner';
import axios from 'axios';

const queryOption = {
  staleTime: 60000,
  cacheTime: 3600000,
};

const ListView = ({ elementType, header }) => {
  const fetchProjects = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/${elementType}`);
    return data;
  };

  const { data, status } = useQuery(`${elementType}s`, fetchProjects, { ...queryOption });

  return (
    <>
      <CaptionBanner text={header} />
      <div className='main-text'>
        {status === 'loading' && <p>Loading ....</p>}
        {status === 'error' && <p>Error fetching data!</p>}
        {status === 'success' &&
          data.map((element) => {
            return <ElementCard key={element._id} element={element} elementType={elementType} />;
          })}
      </div>
    </>
  );
};

export default ListView;
