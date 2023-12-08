import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { message } from 'antd';

import { useEffect, useState } from 'react';
import { addToCart, moveToCartFromNavbar, setOrderSuccess } from '../../redux/slices/cart';
import CustomBtn from '../button';
import AutoImageChange from '../auto-image-change';

import './style.css';

const UserProductsDisplay = ({
  product,
  currentImageIndex,
  setCurrentImageIndex
}) => {
  const dispatch = useDispatch();

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    setProductQuantity(1);
  }, [product]);

  const user = JSON.parse(localStorage.getItem('user'));

  const { isUser } = useSelector((state) => state.authentication);
  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    dispatch(moveToCartFromNavbar());
    dispatch(setOrderSuccess());
    dispatch(addToCart({ userId: user?.userId, product, productQuantity }));
  };

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

  return (
    <div>
      <div className="m-4 ms-3 p-4 user-products-display-main-div">
        <h4 className="ps-3 heading">Product Information:</h4>
        <div className="d-flex">
          <AutoImageChange
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
            product={product}
            handleNextImage={handleNextImage}
            handlePreviousImage={handlePreviousImage}
            images={product.images}
            onChange={(index) => console.log(index)}
          />

          <div className="mt-4 ms-4 pt-3">
            <div className="p-3">
              <b>{product.name}</b>
            </div>
            <div className="ps-3">
              <b>Color</b>
              <div className="d-flex p-2 pe-3">
                {getColorName(product.color)}
              </div>
            </div>
            <div className="mt-1 ps-3 pe-3">
              <p className="">
                <b>Size</b>
              </p>
              <div className="d-flex ps-2">{product.size}</div>
              <div className="d-flex ps-1 mt-3">
                <p>
                  <b>Price : </b>
                </p>
                <p className="ps-2" style={{ color: 'blue' }}>
                  {product.price}
                </p>
              </div>
            </div>
          </div>
        </div>
        {isUser ? (
          <div className="d-flex mt-4 ms-5 ps-4 justify-content-around">
            <div className="d-flex">
              <CustomBtn
                className="py-1"
                variant="secondary"
                btnText="-"
                onClick={() => {
                  if (productQuantity !== 1) {
                    setProductQuantity((prev) => prev - 1);
                  }
                }}
              />
              <div className="d-flex cart-counter-view ms-2 mt-1 me-2">
                {productQuantity}
              </div>
              <CustomBtn
                className="py-1"
                variant="secondary"
                btnText="+"
                onClick={() => {
                  if (productQuantity !== product.quantity) {
                    setProductQuantity((prev) => prev + 1);
                  } else {
                    message.warning('No more products available', 2);
                  }
                }}
              />
            </div>
            <div>
              <Link to="./shopping-bag">
                <CustomBtn btnText="Add to cart" onClick={handleAddToCart} />
              </Link>
            </div>
          </div>
        ) : (
          <Link to="/auth/login">
            <div className="d-flex mt-4 justify-content-end">
              <CustomBtn btnText="Login to continue" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserProductsDisplay;
