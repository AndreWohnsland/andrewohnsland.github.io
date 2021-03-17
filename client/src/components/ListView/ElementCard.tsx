import React from 'react';
import { Link } from 'react-router-dom';
import dateFormatter from './dateFormatter';
import { IElement } from '../../Interfaces/element.interface';

type ElementCardProps = {
  element: IElement;
  elementType: string;
};

const ElementCard: React.FC<ElementCardProps> = ({ element, elementType }) => {
  const createdAt = dateFormatter(element.createdAt);
  const updatedAt = dateFormatter(element.updatedAt);

  const createDateTag = () => {
    if (createdAt === updatedAt) {
      return `Created ${dateFormatter(element.createdAt)}`;
    }
    return `Updated ${dateFormatter(element.updatedAt)}`;
  };

  return (
    <Link
      to={`/${elementType}/${element._id}`}
      style={{ textDecoration: 'none' }}
    >
      <div className="card-div">
        <h3 className="card-title">{element.title}</h3>
        <span className="card-info">{createDateTag()}</span>
        <p className="card-desc">{element.description}</p>
      </div>
    </Link>
  );
};

export default ElementCard;
