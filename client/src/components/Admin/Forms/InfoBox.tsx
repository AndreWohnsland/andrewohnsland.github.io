import { AxiosResponse } from 'axios'
import React from 'react'

type InfoBoxProps = {
  res: AxiosResponse | undefined
  name: string
  handleShow: (value: unknown) => void
}

const InfoBox: React.FC<InfoBoxProps> = ({ res, name, handleShow }) => {
  const closeButton = (): JSX.Element => {
    return (
      <button type="button" className="button-info" onClick={handleShow}>
        x
      </button>
    )
  }

  if (res === undefined) {
    return (
      <div className="error-div">
        {closeButton()}
        <h3>Error getting Response Data</h3>
        <p>There was no response object to get the data from</p>
      </div>
    )
  }

  const divName = res?.status >= 400 ? 'error-div' : 'success-div'
  return (
    <div className={divName}>
      {closeButton()}
      <h3>{`${res.status}, ${res.statusText}:`}</h3>
      <p>{`Data for "${name}":`}</p>
      <p>{res.data.message || res.data}</p>
    </div>
  )
}

export default InfoBox
