import { useEffect } from 'react';
import { message } from 'antd';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import CustomBtn from '../button';
import Trash from '../../assets/images/Trash.svg';
import {
  decrementQuantity,
  getCartOfSpecificUser,
  incrementQuantity,
  removeFromCart
} from '../../redux/slices/cart';

import './style.css';

const colorMap = {
  '#155724': 'green',
  '#AAA': 'grey',
  '#1B1E21': 'black',
  '#231579': 'blue',
  '#740F0F': 'red'
};

function getColorName(hexCode) {
  return colorMap[hexCode] || hexCode;
}

function CartItem({ cartItem }) {
  const { data } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const handleIncrementQuantity = () => {
    const matchingProduct = data.find(
      (product) => product._id === cartItem._id
    );

    if (matchingProduct && cartItem.quantity < matchingProduct.quantity) {
      dispatch(incrementQuantity(cartItem));
    } else {
      message.warning('No more products available', 2);
    }
  };

  const handleDecrementQuantity = () => {
    dispatch(decrementQuantity(cartItem));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(cartItem));
  };

  useEffect(() => {
    dispatch(getCartOfSpecificUser());
  }, [cartItem]);

  return (
    <div className="d-flex cart-item-main-div my-3 ms-4 me-3 selected">
      <div className="container d-flex align-items-center px-4">
        <img
          src={`http://localhost:5000/${cartItem.images[0]}`}
          alt="product"
          className="product-image"
        />
        <div>
          <div className="container d-flex ps-3 px-2">{cartItem.name}</div>
          <div className="d-flex gap-5 ps-3">
            <div className="pt-3">{cartItem.size}</div>
            <div className="pt-3">{getColorName(cartItem.color)}</div>
          </div>
        </div>
      </div>
      <div className="container d-flex align-items-center justify-content-between">

        <div className="d-flex">
          <CustomBtn
            className="py-1"
            variant="secondary"
            btnText="-"
            onClick={handleDecrementQuantity}
          />
          <div className="d-flex cart-counter-view ms-2 mt-1 me-2">
            {cartItem.quantity}
          </div>
          <CustomBtn
            className="py-1"
            variant="secondary"
            btnText="+"
            onClick={handleIncrementQuantity}
          />
        </div>

        <div>
          Price:
          {' '}
          {cartItem.price}
        </div>
        <div className="cart-trash">
          <img
            src={Trash}
            alt="trash"
            onClick={handleRemoveFromCart}
            className="cart-trash-enabled"
          />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
