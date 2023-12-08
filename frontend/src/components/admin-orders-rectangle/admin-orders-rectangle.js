const OrdersRectangle = ({ rectangleText, value }) => (
  <div className="orders-rectangle-main-div">
    <div className="m-2">
      <div>
        <span>{rectangleText}</span>
      </div>
      <div>
        <p className="pt-1 orders-rectangle-text">{value}</p>
      </div>
    </div>
  </div>
);

export default OrdersRectangle;
