import React from 'react';

const InfoBox = ({ res, name, handleShow }) => {
  const successStyle = { backgroundColor: 'rgb(119, 255, 183)', color: 'rgb(0, 160, 53)' };
  const failStyle = { backgroundColor: 'rgb(255, 141, 141)', color: 'rgb(146, 0, 0)' };
  let style = res.status >= 400 ? failStyle : successStyle;
  style = {
    ...style,
    borderRadius: '5px',
    paddingBottom: '2px',
    paddingTop: '7px',
    paddingLeft: '15px',
    paddingRight: '15px',
  };
  const buttonStyle = {
    color: style.color,
    float: 'right',
    backgroundColor: 'Transparent',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    outline: 'none',
    display: 'inline-flex',
    alignItems: 'flex-start',
    fontSize: '2rem',
    lineHeight: '25px',
  };
  return (
    <div style={style}>
      <button style={buttonStyle} onClick={handleShow}>
        x
      </button>
      <h3 style={{ display: 'flex' }}>
        {res.status}, {res.statusText}:
      </h3>
      <p style={{ marginBottom: '0.5rem' }}>Data for "{name}":</p>
      <p style={{ marginBottom: '0.5rem' }}>{res.data.message}</p>
    </div>
  );
};

export default InfoBox;
