import React from 'react';

const Dropdown = ({ label, value, onChange, options }) => {
  return (
    <div>
      <label>{label}:</label>
      <select className='form-control' value={value} onChange={onChange}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
      <br />
    </div>
  );
};

export default Dropdown;
