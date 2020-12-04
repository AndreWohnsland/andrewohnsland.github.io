import React from 'react';
import Shimmer from './Shimmer';

const SkeletonArticle = ({ theme }) => {
  const themeClass = theme || 'dark';

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div className="skeleton-picture" />
      <Shimmer />
    </div>
  );
};

export default SkeletonArticle;
