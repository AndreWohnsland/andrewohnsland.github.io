import React from 'react';
import { Form } from 'react-bootstrap';

type CheckBoxProps = {
  label: string;
  name: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox: React.FC<CheckBoxProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
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
