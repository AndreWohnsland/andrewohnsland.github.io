import React from 'react';
import { Link } from 'react-router-dom';
import dateFormatter from './dateFormatter';

const ElementCard = ({ element, elementType }) => {
  const createdAt = dateFormatter(element.createdAt);
  const updatedAt = dateFormatter(element.updatedAt);

  return (
    <div key={element._id}>
      <Link to={`/${elementType}/${element._id}`} style={{ textDecoration: 'none' }}>
        <div className='card-div'>
          <div className='card-content'>
            <h3 className='card-title'>{element.title}</h3>
            <span className='card-info'>
              {createdAt === updatedAt ? (
                <span>Created {dateFormatter(element.createdAt)} </span>
              ) : (
                <span> Updated {dateFormatter(element.updatedAt)}</span>
              )}
            </span>
            <p className='card-desc'>{element.description}</p>
          </div>
        </div>
      </Link>
      <br />
    </div>
  );
};

export default ElementCard;
