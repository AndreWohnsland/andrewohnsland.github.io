import React from 'react';
import { Form } from 'react-bootstrap';

const Checkbox = ({ label, name, value, onChange }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Check
        name={name}
        type="checkbox"
        checked={value}
        onChange={onChange}
        label={label}
      />
    </Form.Group>
  );
};

export default Checkbox;
