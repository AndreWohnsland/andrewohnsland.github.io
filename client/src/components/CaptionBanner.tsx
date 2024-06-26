import React, { FunctionComponent } from 'react'

type BannerProps = {
  text: string
}

const CaptionBanner: FunctionComponent<BannerProps> = ({ text }) => {
  return (
    <div className="main-header text-center w-100">
      <h2>{text}</h2>
    </div>
  )
}

export default CaptionBanner
