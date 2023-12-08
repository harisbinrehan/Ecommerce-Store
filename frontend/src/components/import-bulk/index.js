import { useSelector } from 'react-redux';
import CustomProgressBar from '../progress-bar';

import CustomBtn from '../button';
import Cross from '../../assets/images/close.svg';

const ImportBulk = ({ setShow, handleCloseBulk, fileName }) => {
  const { bulkUploadResult } = useSelector((state) => state.products);
  const handleViewErrors = () => {
    setShow(true);
  };

  return (
    <div className="container mt-5 import-bulk-div">
      <div className="d-flex justify-content-between">
        <b className="d-flex mt-2">Uploaded File Status</b>
        <img
          style={{ cursor: 'pointer' }}
          src={Cross}
          alt="Arrow Left"
          className="pe-2 pt-2"
          onClick={handleCloseBulk}
        />
      </div>

      <div className="d-flex justify-content-between mt-3">
        <div>
          <p>File Name:</p>
          <p style={{ color: 'grey' }} className="d-flex mb-3">
            {fileName}
          </p>
        </div>
        <div>
          <div className="d-flex">
            <p>File Status: </p>
            {Object.keys(bulkUploadResult).length === 0 ? (
              <b style={{ color: 'red' }} className="d-flex mb-3 ms-2">
                Failed
              </b>
            ) : (
              <b style={{ color: 'green' }} className="d-flex mb-3 ms-2">
                Completed
              </b>
            )}
          </div>
          <div className="mt-1">
            <CustomProgressBar
              successfulUploads={bulkUploadResult.successfulUploads}
              failedUploads={bulkUploadResult.failedUploads}
            />
          </div>
        </div>

        <div>
          <p>Total Products:</p>
          <b
            style={{ color: 'blue' }}
            className="d-flex mb-3 justify-content-center"
          >
            {(bulkUploadResult?.successfulUploads ?? 0)
              + (bulkUploadResult?.failedUploads ?? 0)}
          </b>
        </div>
        <div>
          <p>Successful:</p>
          <b
            style={{ color: 'green' }}
            className="d-flex mb-3 justify-content-center"
          >
            {bulkUploadResult?.successfulUploads || 0}
          </b>
        </div>
        <div>
          <p>Errors:</p>
          <b
            style={{ color: 'red' }}
            className="d-flex mb-3 justify-content-center"
          >
            {bulkUploadResult?.failedUploads || 0}
          </b>
        </div>

        <CustomBtn
          btnText="View Errors"
          variant="outline-primary"
          className="mt-4"
          onClick={handleViewErrors}
        />
      </div>
    </div>
  );
};

export default ImportBulk;
