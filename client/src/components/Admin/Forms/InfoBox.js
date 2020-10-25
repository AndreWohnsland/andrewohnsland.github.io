import React from 'react';

const InfoBox = ({ res, name, handleShow }) => {
  const divName = res.status >= 400 ? 'error-div' : 'success-div';

  return (
    <div className={divName}>
      <button type="button" className="button-info" onClick={handleShow}>
        x
      </button>
      <h3>{`${res.status}, ${res.statusText}:`}</h3>
      <p>{`Data for "${name}":`}</p>
      <p>{res.data.message || res.data}</p>
    </div>
  );
};

export default InfoBox;
