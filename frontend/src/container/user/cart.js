import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { Empty } from 'antd';

import Arrow from '../../assets/images/Arrow left.svg';
import CartItem from '../../components/user-cart-item';
import Trash from '../../assets/images/Trash.svg';
import AddressBox from '../../components/user-address-box';
import CustomBtn from '../../components/button';
import UserCartSummary from '../../components/user-cart-summary';
import AddPayment from '../../components/user-add-payment';
import AddAddress from '../../components/user-add-address-canvas';
import ChangeAddressCanvas from '../../components/user-change-address-canvas';
import {
  deleteSelectedAll,
  getAddress,
  getCartOfSpecificUser,
  setOrderSuccess,
  setProceedToCheckout
} from '../../redux/slices/cart';

import './style.css';

function UserCart() {
  const {
    cartProducts,
    userCart,
    orderSuccess,
    addAddressSuccess,
    updateAddressSuccess,
    proceedToCheckout,
    addresses
  } = useSelector((state) => state.cart);

  const user = JSON.parse(localStorage.getItem('user'));

  const [defaultAddress, setDefaultAddress] = useState({});

  const [addressShow, setAddressShow] = useState(false);

  const [changeAddressShow, setChangeAddressShow] = useState(false);

  const dispatch = useDispatch();

  const [select, setSelect] = useState(false);

  const toggleSelectAll = () => {
    setSelect(() => !select);
  };

  const toggleDeleteAll = () => {
    setSelect(() => !select);
    dispatch(deleteSelectedAll());
  };

  useEffect(() => {
    dispatch(getAddress(user.userId));
  }, [addAddressSuccess, updateAddressSuccess]);

  useEffect(() => {
    dispatch(getCartOfSpecificUser());
    setDefaultAddress(
      addresses?.addressInfo?.find((address) => address.isDefault) || {}
    );
  }, [addresses, cartProducts]);

  const handleAddAddressClick = () => {
    setAddressShow(true);
  };

  const handleSetOrderSuccess = () => {
    dispatch(setOrderSuccess());
  };

  const handleChangeAddressClick = () => {
    setChangeAddressShow(true);
  };

  const handleSetProceedToCheckout = () => {
    dispatch(setProceedToCheckout());
  };

  return (
    <div className="container" style={{ marginTop: '54px' }}>
      <div className="row">
        <div className="d-flex p-2 pt-3">
          {proceedToCheckout ? (
            <img
              className="ms-3 arrow-size"
              src={Arrow}
              alt="<--"
              onClick={handleSetProceedToCheckout}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <Link to="/" onClick={handleSetOrderSuccess}>
              <img
                className="ms-3 pt-2 arrow-size"
                src={Arrow}
                alt="<--"
                style={{ cursor: 'pointer' }}
              />
            </Link>
          )}

          <h2 className="heading pt-2 ps-2">
            {proceedToCheckout
              ? 'Checkout'
              : !proceedToCheckout && orderSuccess
                ? 'Continue Shopping'
                : 'Shopping Bag'}
          </h2>
        </div>

        <div className="col-md-9">
          {orderSuccess ? null : (
            <div className="container pt1 ms-4 me-5 select-all-main-div">
              {proceedToCheckout ? (
                !isEmpty(defaultAddress) ? (
                  <div className="d-flex w-100 justify-content-between">
                    <AddressBox
                      name={defaultAddress.name}
                      mobile={defaultAddress.mobile}
                      address={defaultAddress.address}
                      disableCustomBtn
                    />
                    <CustomBtn
                      btnText="Change"
                      variant="dark"
                      className="m-3"
                      onClick={handleChangeAddressClick}
                    />
                  </div>
                ) : (
                  <CustomBtn
                    btnText="Add Delivery Address"
                    onClick={handleAddAddressClick}
                  />
                )
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={select}
                    onChange={toggleSelectAll}
                    disabled={isEmpty(userCart?.products)}
                  />

                  <span className="container">
                    Select
                    {' '}
                    {userCart?.products?.length}
                    {' '}
                    {userCart?.products?.length === 1 ? 'item' : 'items'}
                  </span>
                  <img
                    className={
                      select ? 'cart-trash-enabled' : 'cart-trash-disabled'
                    }
                    src={Trash}
                    alt="trash"
                    onClick={select ? toggleDeleteAll : undefined}
                  />
                </>
              )}
            </div>
          )}

          {userCart && userCart?.products?.length > 0 ? (
            userCart.products.map((cartItem, index) => (
              <CartItem key={index} cartItem={cartItem} />
            ))
          ) : orderSuccess ? (
            <h2 className="d-flex justify-content-end pt-5">
              Your order has been successfully placed 🙌
            </h2>
          ) : (
            <h2 className="d-flex heading pt-2 ps-2 justify-content-around pt-5">
              {proceedToCheckout ? (
                <Empty description="Please add products in cart to checkout" />
              ) : (
                <Empty description="No products in the cart" />
              )}
            </h2>
          )}
        </div>
        <div className="col-md-3">
          {!orderSuccess ? <UserCartSummary /> : null}
          {proceedToCheckout && (
            <div className="add-payment-container mb-2">
              <AddPayment />
            </div>
          )}
        </div>
      </div>
      {addressShow ? (
        <AddAddress
          header="Add Delivery Address"
          show={addressShow}
          setShow={setAddressShow}
        />
      ) : changeAddressShow ? (
        <ChangeAddressCanvas
          header="Choose Address"
          show={changeAddressShow}
          setShow={setChangeAddressShow}
          setAddAddressShow={setAddressShow}
        />
      ) : null}
    </div>
  );
}

export default UserCart;
