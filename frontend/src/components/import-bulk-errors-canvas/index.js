import Offcanvas from 'react-bootstrap/Offcanvas';
import { Empty } from 'antd';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import arrowLeft from '../../assets/images/Arrow left.svg';

const ImportBulkErrorsCanvas = ({ show, setShow }) => {
  const { bulkUploadResult } = useSelector((state) => state.products);
  const errors = bulkUploadResult?.errorArr;

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      className="custom-offcanvas"
      height={600}
    >
      <div className="d-flex add-product-header">
        <div>
          <img
            src={arrowLeft}
            style={{ cursor: 'pointer' }}
            alt="Cloud"
            className="img-large ps-3 pt-3"
            onClick={handleClose}
          />
        </div>
        <div className="offcanvas-header.custom-offcanvas-header">
          <Offcanvas.Header>
            <Offcanvas.Title>Uploaded File errors</Offcanvas.Title>
          </Offcanvas.Header>
        </div>
      </div>

      <div className="d-flex">
        <div className="d-flex offcanvas-body">
          <Offcanvas.Body>
            {errors && errors.length !== 0 ? (
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>Index #</th>
                    <th>Error Message</th>
                  </tr>
                </thead>
                <tbody>
                  {errors.map((error, index) => (
                    <tr key={index}>
                      <td className="d-flex justify-content-center">{error.row}</td>
                      <td style={{ color: 'red' }}>{error.message}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Empty description="No Errors found" />
            )}
          </Offcanvas.Body>
        </div>
      </div>
    </Offcanvas>
  );
};

export default ImportBulkErrorsCanvas;
