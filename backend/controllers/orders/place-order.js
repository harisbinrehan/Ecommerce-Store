import Order from '../../models/order';
import Product from '../../models/product';
import Notification from '../../models/notification';
import ChargeCustomer from '../stripe/utils/charge-customer';
import generateOrderId from '../../utils/generate-order-id';

const PlaceOrder = async (req, res) => {
  try {
    const {
      username,
      email,
      stripeId,
      cardStripeId,
      userId,
      products,
      totalAmount
    } = req.body;

    const orderId = generateOrderId();

    const newOrder = new Order({
      orderId,
      username,
      userId,
      products,
      totalProducts: products.length,
      total: totalAmount
    });

    const updateProductPromises = products.map(async (product) => {
      try {
        const existingProduct = await Product.findById(product._id);

        if (existingProduct) {
          const newQuantity = existingProduct.quantity - product.quantity;

          existingProduct.sold += product.quantity;

          existingProduct.quantity = newQuantity;

          await existingProduct.save();
        }
      } catch (error) {
        console.error(`Error updating product ${product._id}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    await Promise.all(updateProductPromises);

    await newOrder.save();

    await ChargeCustomer({
      totalAmount: Math.round(totalAmount),
      email,
      stripeId,
      cardStripeId,
      orderId,
      cvc: 123
    });

    const adminNotification = new Notification({
      userId,
      text: `Order# ${orderId} has been placed`,
      isRead: false,
      forAdmin: true
    });

    const userNotification = new Notification({
      userId,
      text: `Order# ${orderId} has been placed`,
      isRead: false,
      forAdmin: false
    });

    await userNotification.save();

    await adminNotification.save();

    return res.status(201).json({
      message: 'Order placed successfully', orderId
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default PlaceOrder;
