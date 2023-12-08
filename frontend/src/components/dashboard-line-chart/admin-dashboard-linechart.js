import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import ordersEllipse from '../../assets/images/orders-unpaid.svg';
import salesEllipse from '../../assets/images/salesEllipse.svg';

const DashboardLineChart = ({ oneYearStats }) => {
  const statsArray = Object.keys(oneYearStats)
    .map((key) => oneYearStats[key])
    .sort((a, b) => {
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ];
      return monthNames.indexOf(a.month) - monthNames.indexOf(b.month);
    });

  const data = statsArray.map((entry) => ({
    name: entry.month,
    orders: entry.totalOrders || 0,
    sales: entry.totalSales || 0
  }));

  return (
    <div className="dashboard-line-chart-main-div">
      <div className="p-4 dashboard-line-chart-text">
        <img src={ordersEllipse} alt="Orders Unpaid Icon" />
        <span className="m-2" style={{ color: 'rgba(0, 123, 255, 1)' }}>
          Orders
        </span>

        <img src={salesEllipse} alt="Orders Paid Icon" />
        <span className="m-2" style={{ color: 'rgba(230, 86, 0, 1)' }}>
          Sales
        </span>
      </div>
      <LineChart
        width={775}
        height={218}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="sales"
          stroke="rgba(230, 86, 0, 1)"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="orders"
          stroke="rgba(0, 123, 255, 1)"
        />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default DashboardLineChart;
