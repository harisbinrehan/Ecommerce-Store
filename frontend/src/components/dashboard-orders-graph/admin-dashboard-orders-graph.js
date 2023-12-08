import { PieChart, Pie, Cell } from 'recharts';
import OrdersPaid from '../../assets/images/orders-paid.svg';
import OrdersUnpaid from '../../assets/images/orders-unpaid.svg';

const COLORS = ['#00C49F', '#0088FE'];

const DashboardOrdersGraph = ({ paidOrders, unpaidOrders }) => {
  const total = paidOrders + unpaidOrders;

  const paidPercentage = total > 0 ? (paidOrders / total) * 100 : 0;

  const unpaidPercentage = total > 0 ? (unpaidOrders / total) * 100 : 0;

  const data = [
    { name: 'Orders Paid', value: paidOrders || 0 },
    { name: 'Orders Unpaid', value: unpaidOrders || 0 }
  ];

  return (
    <div className="dashboard-orders-graph-main-div">
      <PieChart width={250} height={246}>
        <Pie
          data={data}
          cx={120}
          cy={120}
          innerRadius={70}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="ps-2 dashboard-orders-graph-text">
        <div>
          <img src={OrdersPaid} alt="Orders Paid Icon" />
          <span className="ms-2">
            <strong>Orders Paid:</strong>
            {' '}
            {paidOrders}
            {' '}
            <span style={{ color: 'green' }}>
              (
              {paidPercentage.toFixed(2)}
              %)
            </span>
          </span>
        </div>
        <div>
          <img src={OrdersUnpaid} alt="Orders Unpaid Icon" />
          <span className="ms-2">
            <strong>Orders Unpaid:</strong>
            {' '}
            {unpaidOrders}
            {' '}
            <span style={{ color: 'green' }}>
              (
              {unpaidPercentage.toFixed(2)}
              %)
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrdersGraph;
