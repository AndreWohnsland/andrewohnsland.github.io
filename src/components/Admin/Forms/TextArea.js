import React from 'react';

const TextArea = ({ label, name, value, onChange }) => {
  return (
    <div className='form-group'>
      <label>{label}:</label>
      <textarea rows='8' type='text' name={name} required className='form-control' value={value} onChange={onChange} />
    </div>
  );
};

export default TextArea;
