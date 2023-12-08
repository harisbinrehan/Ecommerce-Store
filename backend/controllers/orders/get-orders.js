import Order from '../../models/order';

const GetAllOrders = async (req, res) => {
  try {
    const {
      limit, skip, orderId
    } = req.query;

    const limitValue = orderId ? undefined : Number(limit);

    const skipValue = orderId ? undefined : Number(skip);

    let query = {};

    if (orderId) {
      const regex = new RegExp(orderId, 'i');
      query = { orderId: regex };
    }

    const orders = await Order.find(query).skip(skipValue).limit(limitValue);

    const totalCount = await Order.countDocuments(query);

    if (!orders.length) {
      return res.status(404).json({
        message: 'No orders found.',
        searchedOrders: null
      });
    }

    return res.status(200).json({
      orders, totalCount
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

export default GetAllOrders;
