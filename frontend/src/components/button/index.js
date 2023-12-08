import { Button } from 'react-bootstrap';

const CustomBtn = ({
  id,
  variant,
  size,
  btnText = 'Click Here',
  className,
  disabled,
  onClick
}) => (
  <div>
    <Button
      id={id}
      variant={variant}
      size={size}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {btnText}
    </Button>
  </div>
);
export default CustomBtn;
