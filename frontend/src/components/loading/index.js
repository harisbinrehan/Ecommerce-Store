import { Button, Spinner } from 'react-bootstrap';

function Loading(className) {
  return (
    <div className={className}>
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    </div>
  );
}

export default Loading;
