import React from 'react';
import { Form } from 'react-bootstrap';

const CustomForm = (props) => {
  const {
    className,
    placeholder,
    label,
    type,
    hint,
    value,
    onChange,
    style,
    disabled
  } = props;

  return (
    <div>
      <Form style={style} onSubmit={(e) => e.preventDefault()}>
        <Form.Group className={className}>
          <Form.Label>{label}</Form.Label>
          <Form.Control
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
          <Form.Text className="d-flex ps-1 pt-1" style={{ color: 'rgba(220, 53, 69, 1)' }}>
            {hint}
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CustomForm;
