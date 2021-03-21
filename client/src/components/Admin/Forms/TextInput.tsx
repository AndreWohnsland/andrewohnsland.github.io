import React from 'react';
import { Form } from 'react-bootstrap';

type TextInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control name={name} type="text" value={value} onChange={onChange} />
    </Form.Group>
  );
};

export default TextInput;
