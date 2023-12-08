import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { setOrderSummary, setProceedToCheckout } from '../../redux/slices/cart';
import CustomBtn from '../button';

import './style.css';

function UserCartSummary() {
  const { userCart, orderSummary, proceedToCheckout } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const handleSetProceedToCheckout = () => {
    dispatch(setProceedToCheckout());
  };

  useEffect(() => {
    if (userCart && userCart.products) {
      const subTotal = userCart.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const taxRate = 0.1;

      const tax = subTotal * taxRate;

      const total = subTotal + tax;

      dispatch(
        setOrderSummary({
          subTotal,
          tax,
          total
        })
      );
    }
  }, [userCart]);

  return (
    <div className="card-summary-main-div mb-3">
      {proceedToCheckout && isEmpty(userCart.products) ? (
        <div className="p-3">
          <h3 className="heading" style={{ color: 'yellow' }}>
            Help ?
          </h3>

          <b className="d-flex pt-3 text-justify">
            To proceed with placing an order, kindly ensure that products are
            added to your cart. On this page, you may exclusively provide your
            address and input payment details.
          </b>
        </div>
      ) : (
        <div className="p-3">
          <h3 className="heading">Order Summary</h3>
          <h5 className="pt-3">
            <b>Sub Total:</b>
            {' '}
            $
            {orderSummary?.subTotal?.toFixed(2) || '0'}
          </h5>
          <h5 className="pt-3">
            <b>Tax:</b>
            {' '}
            $
            {orderSummary?.tax?.toFixed(2) || '0'}
          </h5>
          <h5 className="pt-3">
            <b>Total:</b>
            {' '}
            $
            {orderSummary?.total?.toFixed(2) || '0'}
          </h5>
        </div>
      )}

      <div className="d-flex justify-content-center pt-3">
        {!proceedToCheckout && (
          <CustomBtn
            btnText="Proceed to Checkout"
            onClick={handleSetProceedToCheckout}
          />
        )}
      </div>
    </div>
  );
}

export default UserCartSummary;
