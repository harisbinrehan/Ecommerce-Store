import Order from '../../models/order';

const GetAdminOrderStats = async (req, res) => {
  try {
    const orders = await Order.find();

    const units = orders.reduce(
      (total, order) => total + order.products.length,
      0
    );

    const amount = orders.reduce(
      (total, order) => total + parseFloat(order.total),
      0
    );

    return res.status(200).json({
      totalOrders: orders.length,
      totalUnits: units,
      totalAmount: amount
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

export default GetAdminOrderStats;
