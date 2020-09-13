import React from 'react';
import { Form } from 'react-bootstrap';

const TextInput = ({ label, name, value, onChange }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control name={name} type='text' value={value} onChange={onChange} />
    </Form.Group>
  );
};

export default TextInput;
