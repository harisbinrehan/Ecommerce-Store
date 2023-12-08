import { useEffect } from 'react';
import CustomBtn from '../button';

const AutoImageChange = ({
  images,
  onChange,
  handleNextImage,
  handlePreviousImage,
  product,
  currentImageIndex,
  setCurrentImageIndex
}) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentImageIndex < images.length - 1) {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentImageIndex(0);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, images]);

  useEffect(() => {
    onChange(currentImageIndex);
  }, [currentImageIndex, onChange]);

  return (
    <div className="d-flex">
      <CustomBtn
        className="product-display-image-button"
        variant="light"
        btnText="<"
        onClick={handlePreviousImage}
        disabled={currentImageIndex === 0}
      />

      <img
        src={`http://localhost:5000/${images[currentImageIndex]}`}
        alt="product"
        className="user-products-display-image"
        style={{ width: '100%' }}
      />
      <div className="justify-content-center align-items-center">
        <CustomBtn
          className="product-display-image-button ms-3"
          variant="light"
          btnText=">"
          onClick={handleNextImage}
          disabled={currentImageIndex === product.images.length - 1}
        />
      </div>
    </div>
  );
};

export default AutoImageChange;
