import React from 'react';
import './Skeleton.scss';

function SkeletonElement({ type }) {
  const classes = `skeleton ${type}`;

  return <div className={classes} />;
}

export default SkeletonElement;
