import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserModuleHeader from '../../components/user-module-heading';
import UserProducts from '../../components/user-products';

import './style.css';

function UserMainPage() {
  const products = useSelector((state) => state.products.data);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (products && products.length > 0) {
      setSelectedProduct(products[0]);
    }
  }, [products]);

  return (
    <div className={products.length !== 0 && 'user-main-page'}>
      <UserModuleHeader />
      <div className="d-flex">
        <div className="scrollable-section">
          <UserProducts
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        </div>
      </div>
    </div>
  );
}
export default UserMainPage;
