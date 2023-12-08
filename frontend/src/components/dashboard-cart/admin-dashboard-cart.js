import Cart from '../../assets/images/shopping_cart.svg';

const DashboardCart = ({
  cartText,
  totalOrders,
  totalUnits,
  totalSale
}) => (
  <div className="dashboard-cart-main-div container">
    <div className="mt-3 ms-2">
      <img src={Cart} alt="Cart Icon" className="" />
      <b className="ps-2">{cartText}</b>
    </div>

    <div className="d-flex justify-content-between ">
      <div className="m-2 pt-2">
        <span>Total Orders: </span>
        <b className="ps-1">{totalOrders}</b>
      </div>
      <div className="m-2 pt-2">
        <span>Total Units: </span>
        <b className="ps-1">{totalUnits}</b>
      </div>
    </div>
    <div className="d-flex justify-content-start ms-2 pt-2">
      <span>Total Sale: </span>
      <b className="ps-1">{totalSale}</b>
    </div>
  </div>
);

export default DashboardCart;
