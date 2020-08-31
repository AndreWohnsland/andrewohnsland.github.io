import React from 'react';
import { Link } from 'react-router-dom';

const ElementCard = ({ element, elementType }) => {
  return (
    <div key={element._id}>
      <Link to={`/${elementType}/${element._id}`} style={{ textDecoration: 'none' }}>
        <div className='card-div'>
          <div className='card-content'>
            <h3 className='card-title'>{element.title}</h3>
            <p className='card-desc'>{element.description}</p>
          </div>
        </div>
      </Link>
      <br />
    </div>
  );
};

export default ElementCard;
