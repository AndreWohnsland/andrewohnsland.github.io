import React from 'react';
import { Form } from 'react-bootstrap';

const TextArea = ({ label, name, value, onChange }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        as="textarea"
        rows="8"
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default TextArea;
