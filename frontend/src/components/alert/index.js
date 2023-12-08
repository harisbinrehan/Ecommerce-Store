import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function CustomAlert({ variant, alertText, className }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className={className}>
        <Alert
          variant={variant}
          className={className}
          onClose={() => setShow(false)}
          dismissible
        >
          {alertText}
        </Alert>
      </div>
    );
  }
}

export default CustomAlert;
