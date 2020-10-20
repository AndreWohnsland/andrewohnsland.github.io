import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Picture from './Picture';

const PictureView = () => {
  const fetchpictures = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/image`);
    return data;
  };

  const { data, status } = useQuery('pictures', fetchpictures, { staleTime: 60000, cacheTime: 3600000 });
  return (
    <div>
      <div className='text-center main-header'>
        <h1>Pictures</h1>
      </div>
      <div className='main-text'>
        {status === 'loading' && <p>Loading ....</p>}
        {status === 'error' && <p>Error fetching data!</p>}
        {status === 'success' && (
          <div className='picture-container'>
            {data.map((element) => {
              return <Picture key={element._id} data={element} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PictureView;
