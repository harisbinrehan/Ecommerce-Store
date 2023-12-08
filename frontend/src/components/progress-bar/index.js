import ProgressBar from 'react-bootstrap/ProgressBar';

const CustomProgressBar = ({ successfulUploads, failedUploads }) => {
  const totalUploads = successfulUploads + failedUploads;

  let successfulUploadPercentage = 0;
  let failedUploadPercentage = 100;

  if (!Number.isNaN(totalUploads) && totalUploads > 0) {
    successfulUploadPercentage = (successfulUploads / totalUploads) * 100;
    failedUploadPercentage = (failedUploads / totalUploads) * 100;
  }

  return (
    <ProgressBar>
      <ProgressBar
        striped
        variant="success"
        label={`${successfulUploadPercentage.toFixed(2)}%`}
        now={successfulUploadPercentage}
        key={1}
      />
      <ProgressBar
        striped
        variant="danger"
        label={`${failedUploadPercentage.toFixed(2)}%`}
        now={failedUploadPercentage}
        key={2}
      />
    </ProgressBar>
  );
};

export default CustomProgressBar;
