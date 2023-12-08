import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { editPaymentDetails, getPaymentDetails } from '../../redux/slices/cart';
import arrowLeft from '../../assets/images/Arrow left.svg';
import CustomForm from '../input';
import CustomBtn from '../button';

const EditPaymentCanvas = ({ show, setShow }) => {
  const { paymentDetails, selectedCardIndex, paymentDetailsStatus } = useSelector((state) => state.cart);

  const [isMonthValid, setIsMonthValid] = useState(true);
  const [isYearValid, setIsYearValid] = useState(true);
  const [monthSuggestions, setMonthSuggestions] = useState([]);
  const [yearSuggestions, setYearSuggestions] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch();

  const [cardholderName, setCardholderName] = useState(user?.username || '');

  const [exp_month, setExpiryMonth] = useState(
    paymentDetails[selectedCardIndex].exp_month
  );
  const [exp_year, setExpiryYear] = useState(
    paymentDetails[selectedCardIndex].exp_year % 100
  );

  const validateMonth = (inputMonth) => {
    const isValidMonth = inputMonth >= 1 && inputMonth <= 12;
    setIsMonthValid(isValidMonth);

    const localMonthSuggestions = isValidMonth
      ? []
      : ['Month should be between 1 and 12.'];
    setMonthSuggestions(localMonthSuggestions);
  };

  const validateYear = (inputYear) => {
    const isValidYear = inputYear >= 23 && inputYear <= 73;
    setIsYearValid(isValidYear);

    const localYearSuggestions = isValidYear
      ? []
      : ['Year should be between 23 and 73.'];
    setYearSuggestions(localYearSuggestions);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleEditPaymentDetails = () => {
    const cardStripeId = paymentDetails[selectedCardIndex].cardId;
    const userStripeId = user.stripeId;

    const paymentDetailsUpdated = {
      exp_month,
      exp_year
    };

    if (user) {
      dispatch(
        editPaymentDetails({
          cardStripeId,
          userStripeId,
          paymentDetails: paymentDetailsUpdated
        })
      );
      handleClose();
    }
  };

  useEffect(() => {
    dispatch(getPaymentDetails(user.userId));
  }, [paymentDetailsStatus]);

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
        <Offcanvas.Header>
          <Offcanvas.Title>Edit Payment Details</Offcanvas.Title>
        </Offcanvas.Header>
      </div>

      <div className="d-flex">
        <div className="d-flex offcanvas-body">
          <Offcanvas.Body>
            <div className="container pt-2">
              <div className="d-flex justify-content-between pt-4">
                <div>
                  <CustomForm
                    label="Expiry Month"
                    placeholder="Expiry month"
                    value={exp_month}
                    onChange={(e) => {
                      if (e.target.value !== '') {
                        validateMonth(parseInt(e.target.value, 10));
                        setExpiryMonth(parseInt(e.target.value, 10));
                      } else {
                        setExpiryMonth('');
                      }
                    }}
                    hint={(
                      <span className={isMonthValid ? 'success-hint' : ''}>
                        {monthSuggestions.join(' ')}
                      </span>
                    )}
                  />
                </div>
                <div>
                  <CustomForm
                    label="Expiry Year"
                    placeholder="Expiry year"
                    value={exp_year}
                    hint={(
                      <span className={isYearValid ? 'success-hint' : ''}>
                        {yearSuggestions.join(' ')}
                      </span>
                    )}
                    onChange={(e) => {
                      if (e.target.value !== '') {
                        validateYear(parseInt(e.target.value, 10));
                        setExpiryYear(parseInt(e.target.value, 10));
                      } else {
                        setExpiryYear('');
                      }
                    }}
                  />
                </div>
              </div>
              <div className="pt-4">
                <CustomForm
                  disabled
                  label="Cardholder Name"
                  placeholder="Cardholder Name"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                />

              </div>
              <div className="mt-5">
                <CustomBtn
                  btnText="Update"
                  onClick={handleEditPaymentDetails}
                  disabled={!isMonthValid || !isYearValid}
                />
              </div>
            </div>
          </Offcanvas.Body>
        </div>
      </div>
    </Offcanvas>
  );
};

export default EditPaymentCanvas;
