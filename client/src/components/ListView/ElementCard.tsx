import React from 'react';
import { Link } from 'react-router-dom';
import dateFormatter from './dateFormatter';
import { IElement } from '../../Interfaces/element.interface';

type ElementCardProps = {
  element: IElement;
  elementType: string;
  uid: string;
};

const ElementCard: React.FC<ElementCardProps> = ({
  element,
  elementType,
  uid,
}) => {
  const createdAt = dateFormatter(element.createdAt);
  const updatedAt = dateFormatter(element.updatedAt);

  const createDateTag = () => {
    if (createdAt === updatedAt) {
      return `Created ${createdAt}`;
    }
    return `Updated ${updatedAt}`;
  };

  return (
    <Link
      to={`/${elementType}/${element.slug}`}
      style={{ textDecoration: 'none' }}
    >
      <div className="card-div">
        <h3 className="element-card-title">
          {element.title}
          <i>{element.draft && ' (draft)'}</i>
        </h3>
        <span className="element-card-info">{createDateTag()}</span>
        <p className="element-card-desc">{element.description}</p>
        <p className="element-card-category">
          {element.category.sort().map((cat) => {
            return <span key={`${uid}-${cat}`}>{`#${cat}`}</span>;
          })}
        </p>
      </div>
    </Link>
  );
};

export default ElementCard;
