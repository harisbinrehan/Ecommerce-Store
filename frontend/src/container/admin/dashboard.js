import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getNotifications, getOrderStats, startAgendaJobs } from '../../redux/slices/order';
import DashboardCart from '../../components/dashboard-cart/admin-dashboard-cart';

import DashboardOrdersGraph from '../../components/dashboard-orders-graph/admin-dashboard-orders-graph';
import DashboardLineChart from '../../components/dashboard-line-chart/admin-dashboard-linechart';

import TopSelling from '../../components/admin-top-selling';

import './style.css';

const Dashboard = () => {
  const { orderStats } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
    dispatch(getOrderStats());
    dispatch(startAgendaJobs());
  }, []);

  return (
    <div className="table-body dashboard-main-div">
      <h2 className="heading d-flex p-4">Dashboard</h2>
      <div className="d-flex justify-content-around gap-4 ms-4 me-3">
        <DashboardCart
          cartText="Today"
          totalOrders={
            orderStats?.todayStats?.totalOrders !== undefined
              ? orderStats.todayStats.totalOrders
              : '0'
          }
          totalUnits={
            orderStats?.todayStats?.totalUnits !== undefined
              ? orderStats.todayStats.totalUnits
              : '0'
          }
          totalSale={
            orderStats?.todayStats?.totalSales !== undefined
              ? orderStats.todayStats.totalSales.toFixed(2)
              : '0'
          }
        />

        <DashboardCart
          cartText="7 Days"
          totalOrders={
            orderStats?.sevenDayStats?.totalOrders !== undefined
              ? orderStats.sevenDayStats.totalOrders
              : '0'
          }
          totalUnits={
            orderStats?.sevenDayStats?.totalUnits !== undefined
              ? orderStats.sevenDayStats.totalUnits
              : '0'
          }
          totalSale={
            orderStats?.sevenDayStats?.totalSales !== undefined
              ? orderStats.sevenDayStats.totalSales.toFixed(2)
              : '0'
          }
        />

        <DashboardCart
          cartText="30 Days"
          totalOrders={
            orderStats?.thirtyDayStats?.totalOrders !== undefined
              ? orderStats.thirtyDayStats.totalOrders
              : '0'
          }
          totalUnits={
            orderStats?.thirtyDayStats?.totalUnits !== undefined
              ? orderStats.thirtyDayStats.totalUnits
              : '0'
          }
          totalSale={
            orderStats?.thirtyDayStats?.totalSales !== undefined
              ? orderStats.thirtyDayStats.totalSales.toFixed(2)
              : '0'
          }
        />
      </div>
      <div>
        <div className="d-flex pt-2 gap-5">
          <div className="ms-1 pt-3">
            <b
              className="d-flex justify-content-center mb-3"
              style={{ color: 'grey' }}
            >
              Orders Overview
            </b>
            <DashboardOrdersGraph
              paidOrders={orderStats?.totalPaidOrders || 0}
              unpaidOrders={orderStats?.totalUnpaidOrders || 0}
            />
          </div>
          <div className="pt-3">
            <b
              className="d-flex justify-content-center mb-3"
              style={{ color: 'grey' }}
            >
              Sales and Orders Report
            </b>
            <DashboardLineChart oneYearStats={orderStats?.oneYearStats || {}} />
          </div>
        </div>
        <div>
          <TopSelling />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
