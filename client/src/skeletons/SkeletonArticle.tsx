import React, { FunctionComponent } from 'react'
import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'

type SkeletonProps = {
  theme: string
}

const SkeletonArticle: FunctionComponent<SkeletonProps> = ({ theme }) => {
  const themeClass: string = theme || 'dark'

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div className="skeleton-article">
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonArticle
