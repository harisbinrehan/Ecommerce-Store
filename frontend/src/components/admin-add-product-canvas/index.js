import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch } from 'react-redux';

import CustomForm from '../input';
import CustomBtn from '../button';
import arrowLeft from '../../assets/images/Arrow left.svg';
import CloudBox from '../cloud-box/cloud-box';
import {
  addProduct,
  updateProduct
} from '../../redux/slices/products';

import './style.css';

const AddProductCustomCanvas = ({
  header,
  btnText,
  _id,
  selectedProduct,
  addProductCanvasShow,
  setAddProductCanvasShow,
  updateProductCanvasShow,
  setUpdateProductCanvasShow
}) => {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [isPriceValid, setIsPriceValid] = useState(false);
  const [isQuantityValid, setIsQuantityValid] = useState(false);
  const [priceSuggestions, setPriceSuggestions] = useState([]);
  const [quantitySuggestions, setQuantitySuggestions] = useState([]);
  const [formData, setFormData] = useState({
    _id,
    name: selectedProduct?.name || '',
    price: selectedProduct?.price || 0,
    size: selectedProduct?.size || '',
    color: selectedProduct?.color || '',
    quantity: selectedProduct?.quantity || 0
  });

  const handleClose = () => {
    if (addProductCanvasShow) {
      setAddProductCanvasShow(false);
    } else if (updateProductCanvasShow) {
      setUpdateProductCanvasShow(false);
    }
  };

  const handleAddProduct = () => {
    const obj = {
      ...formData,
      images: selectedImages
    };
    dispatch(addProduct({ obj }));
  };

  const handleUpdateProduct = () => {
    const obj = {
      ...formData,
      images: selectedImages,
      deletedImages
    };

    dispatch(updateProduct({ obj }));
    setUpdateProductCanvasShow(false);
  };

  const validatePrice = (inputPrice) => {
    const isValidPrice = /^\d+(\.\d{1,2})?$/.test(inputPrice) && inputPrice >= 0;

    const suggestions = isValidPrice
      ? []
      : [
        'Price should be a non-negative value and can have up to 2 decimal places'
      ];

    setIsPriceValid(isValidPrice);
    setPriceSuggestions(suggestions);
  };

  const validateQuantity = (inputQuantity) => {
    const isPositiveInteger = inputQuantity >= 0 && Number.isInteger(+inputQuantity);

    const suggestions = isPositiveInteger
      ? []
      : ['Quantity should be a non-negative integer value'];

    setIsQuantityValid(isPositiveInteger);
    setQuantitySuggestions(suggestions);
  };

  useEffect(() => {
    if (selectedProduct) {
      setIsPriceValid(true);
      setIsQuantityValid(true);
      setSelectedImages(selectedProduct.images || '');
    }
  }, []);

  return (
    <Offcanvas
      show={addProductCanvasShow || updateProductCanvasShow}
      onHide={handleClose}
      placement="end"
      className="custom-offcanvas"
      height={600}
    >
      <div className="d-flex add-product-header">
        <div>
          <img
            src={arrowLeft}
            alt="Cloud"
            className="img-large ps-3 pt-3"
            onClick={handleClose}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="offcanvas-header.custom-offcanvas-header">
          <Offcanvas.Header>
            <Offcanvas.Title>{header}</Offcanvas.Title>
          </Offcanvas.Header>
        </div>
      </div>

      <div className="d-flex">
        <div className="p-4">
          <CloudBox
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            deletedImages={deletedImages}
            setDeletedImages={setDeletedImages}
          />
        </div>
        <div className="d-flex offcanvas-body">
          <Offcanvas.Body>
            <div>
              <CustomForm
                label="Product Name"
                placeholder="Add product name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="pt-2">
              Size
              <div className="d-flex pt-2 pb-2">
                {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map(
                  (size, index) => (
                    <div
                      className={`size rounded p-1 ${
                        formData.size === size ? 'selected' : ''
                      }`}
                      key={index}
                      onClick={() => setFormData({ ...formData, size })}
                    >
                      {size}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="pt-2">
              Color
              <div className="d-flex pt-2 pb-2">
                {['#155724', '#AAA', '#1B1E21', '#231579', '#740F0F'].map(
                  (color, index) => (
                    <div
                      className={`square rounded ${
                        formData.color === color ? 'selected' : ''
                      }`}
                      key={index}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData({ ...formData, color })}
                    />
                  )
                )}
              </div>
            </div>

            <div className="pt-2">
              <CustomForm
                label="Price"
                placeholder="$00.00"
                value={formData.price}
                hint={(
                  <span className={isPriceValid ? 'success-hint' : ''}>
                    {priceSuggestions.join(' ')}
                  </span>
                )}
                onChange={(e) => {
                  const newPrice = e.target.value;
                  setFormData({ ...formData, price: newPrice });
                  validatePrice(newPrice);
                }}
              />
            </div>

            <div className="pt-2">
              <CustomForm
                label="Quantity"
                placeholder="Quantity"
                value={formData.quantity}
                hint={(
                  <span className={isQuantityValid ? 'success-hint' : ''}>
                    {quantitySuggestions.join(' ')}
                  </span>
                )}
                onChange={(e) => {
                  const newQuantity = e.target.value;
                  setFormData({ ...formData, quantity: newQuantity });
                  validateQuantity(newQuantity);
                }}
              />
            </div>

            <div className="d-flex justify-content-center pt-5">
              <CustomBtn
                btnText={btnText}
                className="d-flex custom-button justify-content-center p-2"
                size="sm"
                onClick={() => {
                  if (addProductCanvasShow) {
                    handleAddProduct();
                  } else if (updateProductCanvasShow) {
                    handleUpdateProduct();
                  }
                }}
                disabled={!isPriceValid || !isQuantityValid}
              />
            </div>
          </Offcanvas.Body>
        </div>
      </div>
    </Offcanvas>
  );
};

export default AddProductCustomCanvas;
