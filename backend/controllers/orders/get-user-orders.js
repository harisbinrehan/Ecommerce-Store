import Order from '../../models/order';

const GetUserOrders = async (req, res) => {
  try {
    const {
      userId, skip, limit
    } = req.query;

    const limitValue = Number(limit) || 0;

    const skipValue = Number(skip) || 0;

    const orders = await Order.find({ userId })
      .skip(skipValue)
      .limit(limitValue);

    const totalCount = await Order.countDocuments({ userId });

    return res.status(200).json({
      orders,
      totalCount
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

export default GetUserOrders;
