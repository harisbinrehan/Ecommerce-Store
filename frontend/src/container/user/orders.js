import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Empty } from 'antd';

import { Table } from 'react-bootstrap';
import arrowLeft from '../../assets/images/Arrow left.svg';
import sideArrow from '../../assets/images/Arrow up right.svg';
import { setUserOrderDetailsShow } from '../../redux/slices/cart';
import UserOrderDetailsCanvas from '../../components/user-order-details';
import {
  decrementPage, fetchUserOrders, incrementPage, setAnyPage, setLimit, setPageOne
} from '../../redux/slices/order';
import OrdersPaginationComponent from '../../components/orders-paginantion';

const UserOrders = () => {
  const location = useLocation();

  const [selectedOrder, setSelectedOrder] = useState(null);

  const searchParams = new URLSearchParams(location.search);

  const userId = searchParams.get('userId');

  const { userOrderDetailsShow } = useSelector((state) => state.cart);

  const {
    page,
    limit,
    totalCount,
    orders
  } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const handleOrderDetailsCanvas = (order) => {
    setSelectedOrder(order);
    dispatch(setUserOrderDetailsShow());
  };

  const handleSetPageOne = () => {
    dispatch(setPageOne());
  };

  const PageChangeFunction = (newPage) => {
    dispatch(setAnyPage(newPage));
  };

  useEffect(() => {
    dispatch(fetchUserOrders(userId));

    if (userOrderDetailsShow) {
      dispatch(setUserOrderDetailsShow());
    }
  }, [page, limit]);

  return orders.length === 0 ? (
    <Empty description="No orders found" style={{ marginTop: '250px' }} />
  ) : (
    <div className="table-body user-table-body">
      <div className="d-flex p-4">
        <Link to="/">
          <img src={arrowLeft} alt="Cloud" className="img-large" />
        </Link>
        <h2 className="d-flex ps-3 pt-1">Orders</h2>
      </div>
      <div className="container">
        <Table bordered hover responsive>
          <thead>
            <tr className="table-secondary mt-3">
              <th>Date</th>
              <th>Order #</th>
              <th>User</th>
              <th>Products</th>
              <th>Amount</th>
              <th>Status</th>
              <th className="ps-5">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td className="pt-2">
                  {new Date(order.date).toLocaleString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </td>
                <td className="pt-2" style={{ fontWeight: 'bold' }}>
                  {order.orderId}
                </td>
                <td className="pt-2">{order.username}</td>
                <td className="pt-2 ps-4">{order.products.length}</td>
                <td className="pt-2 ps-3">{order.total}</td>
                <td>
                  {order.isPaid ? (
                    <div className="row-paid-div">Paid</div>
                  ) : (
                    <div className="row-unpaid-div">Unpaid</div>
                  )}
                </td>
                <td>
                  <div className="d-flex gap-2 justify-content-end">
                    <img
                      src={sideArrow}
                      alt="arrow"
                      className="d-flex pt-1 mark-delivered-arrow pe-5"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleOrderDetailsCanvas(order)}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {userOrderDetailsShow && (
              <UserOrderDetailsCanvas orderData={selectedOrder} />
            )}
          </tbody>
        </Table>
        <div className="d-flex justify-content-end pe-3">
          <OrdersPaginationComponent
            page={page}
            limit={limit}
            totalCount={totalCount}
            onNextPage={() => dispatch(incrementPage())}
            onPrevPage={() => dispatch(decrementPage())}
            onPageChange={PageChangeFunction}
            onLimitChange={(newLimit) => {
              dispatch(setLimit(newLimit));
              handleSetPageOne();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
