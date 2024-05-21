import React, { FunctionComponent } from 'react'
import Shimmer from './Shimmer'

type SkeletopProps = {
  theme: string
}

const SkeletonArticle: FunctionComponent<SkeletopProps> = ({ theme }) => {
  const themeClass: string = theme || 'dark'

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div className="skeleton-picture" />
      <Shimmer />
    </div>
  )
}

export default SkeletonArticle
