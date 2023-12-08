import Order from '../../../models/order';

const SetStatusPaidOnChargeCustomer = async (req) => {
  const { orderId } = req.body.data.object.metadata;

  await Order.updateOne(
    { orderId },
    { $set: { isPaid: true } }
  );
};

export default SetStatusPaidOnChargeCustomer;
