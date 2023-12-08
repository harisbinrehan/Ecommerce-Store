import Form from 'react-bootstrap/Form';

const CustomCheckbox = ({ id, label }) => (
  <Form.Check type="radio" id={id} label={label} />
);

export default CustomCheckbox;
