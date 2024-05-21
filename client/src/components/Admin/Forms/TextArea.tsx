import React from 'react'
import { Form } from 'react-bootstrap'

type TextAreaProps = {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <Form.Group controlId={name} className="element-form-group">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        as="textarea"
        rows={16}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  )
}

export default TextArea
