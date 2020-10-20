import React from 'react';

const Picture = ({ data }) => {
  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const base64Flag = 'data:image/jpeg;base64,';
  const imageStr = arrayBufferToBase64(data.img.data.data);
  return (
    <div className='image-card'>
      <img className='image' src={base64Flag + imageStr} alt={data.name} />
      <p>{data.name}</p>
      {/* <p>{data.description}</p> */}
    </div>
  );
};

export default Picture;
