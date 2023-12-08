import Notification from '../../models/notification';
import Order from '../../models/order';

const SetOrderAsDelivered = async (req, res) => {
  try {
    const { orderId } = req.query;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { userId } = order;

    const updatedOrderId = order.orderId;

    const updatedOrder = await Order.updateOne(orderId, { isDelivered: true });

    const newNotification = new Notification({
      userId,
      text: `Order# ${updatedOrderId} has been delivered`,
      isRead: false,
      forAdmin: false
    });

    await newNotification.save();

    return res.status(200).json({
      message: 'Order has been marked as delivered',
      order: updatedOrder
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default SetOrderAsDelivered;
