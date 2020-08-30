import React from 'react';

const TextInput = ({ label, name, value, onChange }) => {
  return (
    <div className='form-group'>
      <label>{label}:</label>
      <input type='text' name={name} required className='form-control' value={value} onChange={onChange} />
    </div>
  );
};

export default TextInput;
