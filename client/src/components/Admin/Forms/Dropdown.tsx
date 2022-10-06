import React from 'react';
import { Form } from 'react-bootstrap';

type OptionProps = {
  name: string;
  value: string;
};

type DropdownProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: OptionProps[];
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <Form.Group controlId={label} className="element-form-group">
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" value={value} onChange={onChange}>
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
