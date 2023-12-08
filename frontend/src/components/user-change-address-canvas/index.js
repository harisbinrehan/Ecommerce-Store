import { useSelector } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';

import arrowLeft from '../../assets/images/Arrow left.svg';
import AddressBox from '../user-address-box';
import CustomBtn from '../button';

import './style.css';

const ChangeAddressCanvas = ({
  header,
  show,
  setShow,
  setAddAddressShow
}) => {
  const { addresses } = useSelector((state) => state.cart);

  const handleClose = () => {
    setShow(false);
  };

  const handleAddAddressClick = () => {
    setShow(false);
    setAddAddressShow(true);
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      className="custom-offcanvas"
      style={{ height: '100vh' }}
    >
      <div className="d-flex add-product-header">
        <div>
          <img
            src={arrowLeft}
            alt="Arrow Left"
            style={{ cursor: 'pointer' }}
            className="img-large ps-2 pt-3"
            onClick={handleClose}
          />
        </div>
        <div className="custom-offcanvas-header p-2">
          <Offcanvas.Header>
            <Offcanvas.Title>{header}</Offcanvas.Title>
          </Offcanvas.Header>
        </div>
      </div>

      <div className="d-flex">
        <div className="d-flex offcanvas-body">
          <Offcanvas.Body>
            <div className="container pt-2">
              {addresses?.addressInfo?.map((address, index) => (
                <div
                  key={index}
                  className="mt-3"
                  style={{ border: '1px solid #000', borderRadius: '10px' }}
                >
                  <AddressBox
                    name={address.name}
                    mobile={address.mobile}
                    address={address.address}
                    isDefault={address.isDefault}
                    index={index}
                  />
                </div>
              ))}
            </div>
            <div>
              <CustomBtn
                className="d-flex m-3 mt-5"
                btnText="Add New"
                onClick={handleAddAddressClick}
              />
            </div>
          </Offcanvas.Body>
        </div>
      </div>
    </Offcanvas>
  );
};

export default ChangeAddressCanvas;
