import React from 'react';
import { Form } from 'react-bootstrap';

const Dropdown = ({ label, value, onChange, options }) => {
  return (
    <Form.Group controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as='select' value={value} onChange={onChange}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </Form.Control>
    </Form.Group>
  );
};

export default Dropdown;
