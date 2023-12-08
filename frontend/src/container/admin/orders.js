import React, { useEffect } from 'react';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Empty } from 'antd';
import CustomForm from '../../components/input';
import sideArrow from '../../assets/images/Arrow up right.svg';
import {
  decrementPage,
  fetchAllOrders,
  getAdminOrderStats,
  incrementPage,
  setAnyPage,
  setLimit,
  setOrderAsDelivered,
  setPageOne
} from '../../redux/slices/order';
import CustomAlert from '../../components/alert';
import OrdersRectangle from '../../components/admin-orders-rectangle/admin-orders-rectangle';

import './style.css';
import OrdersPaginationComponent from '../../components/orders-paginantion';

const Orders = () => {
  const dispatch = useDispatch();

  const {
    page, limit, totalCount, orders, ordersError, adminOrderStats
  } = useSelector(
    (state) => state.order
  );

  const handleSetMarkAsDelivered = (orderId) => {
    dispatch(setOrderAsDelivered(orderId))
      .then(() => {
        dispatch(fetchAllOrders());
      })
      .catch((error) => {
        console.error('Error marking order as delivered:', error);
      });
  };

  const handleSetPageOne = () => {
    dispatch(setPageOne());
  };

  const PageChangeFunction = (newPage) => {
    dispatch(setAnyPage(newPage));
  };

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(getAdminOrderStats());
  }, [page, limit]);

  const handleSearch = debounce((e) => {
    dispatch(fetchAllOrders(e.target.value));
  }, 500);

  return (
    <div className="table-body orders-main-div">
      <h2 className="heading d-flex p-4">Orders</h2>
      <div className="d-flex justify-content-around ps-3 pe-3">
        <OrdersRectangle
          rectangleText="Total orders: "
          value={adminOrderStats.totalOrders || 0}
        />
        <OrdersRectangle
          rectangleText="Total units: "
          value={adminOrderStats.totalUnits || 0}
        />
        <OrdersRectangle
          rectangleText="Total amount: "
          value={(adminOrderStats.totalAmount || 0).toFixed(2)}
          here
          append
          dollar
          sign
        />
      </div>

      <div>
        <div className="w-100 h-100 p-4">
          <div className="header-buttons">
            <b className="fs-5 mt-2">Search :</b>
            <CustomForm
              style={{ marginTop: '-20px' }}
              placeholder="Search by id"
              className="mx-3"
              onChange={handleSearch}
            />
          </div>
          {orders.length !== 0 ? (
            <>
              <div className="product-table-orders">
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
                            <Link
                              to={{
                                pathname: '/admin/order-details',
                                search: `?orderId=${order._id}`
                              }}
                            >
                              <img
                                src={sideArrow}
                                alt="arrow"
                                className="pt-1 mark-delivered-arrow"
                                style={{ cursor: 'pointer' }}
                              />
                            </Link>
                            {order.isDelivered ? (
                              <div className="d-flex pt-1 ms-4 mark-delivered-div">
                                Delivered
                              </div>
                            ) : (
                              <div
                                className="pt-1 ms-4 mark-as-delivered-div"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  handleSetMarkAsDelivered(order._id);
                                }}
                              >
                                Mark as Delivered
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
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
            </>
          ) : (
            <Empty className="mt-5 pt=5" description="No orders found" />
          )}

          {ordersError && (
            <div>
              <CustomAlert variant="danger" alertText="Error" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
