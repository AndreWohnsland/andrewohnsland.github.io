import React, { FunctionComponent } from 'react';
import './Skeleton.scss';

type SkeletopProps = {
  type: string;
};

const SkeletonElement: FunctionComponent<SkeletopProps> = ({ type }) => {
  const classes = `skeleton ${type}`;

  return <div className={classes} />;
};

export default SkeletonElement;
