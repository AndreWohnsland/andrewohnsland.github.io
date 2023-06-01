import React from 'react';
import { Link } from 'react-router-dom';

type NotFoundProps = {
  elementType: string;
};

const NotFoundElement: React.FC<NotFoundProps> = ({ elementType }) => {
  const path = elementType === 'project' ? '/projects' : '/blog';
  const label = elementType === 'project' ? 'Find at Projects' : 'Find at Blog';
  return (
    <div className="container text-center h-100 mt-5 pt-5">
      <div className="h-100 justify-content-center align-items-center pt-2">
        <h1 className="text-danger display-1 fw-bold mb-0">404</h1>
        <h2 className="text-danger-emphasis display-7 fw-semibold mb-0">
          Could not find this Element!
        </h2>
        <p className="fs-5">Make sure that this URL is right.</p>
        <p className="mb-2 mt-4 fst-italic">
          You can also seek it in the list:
        </p>
        <Link to={path} style={{ textDecoration: 'none' }}>
          <span className="btn btn-primary btn-lg">{label}</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundElement;
