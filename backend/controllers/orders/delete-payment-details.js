import { stripeSecretKeyClient } from '../../config/config';

const DeletePaymentDetails = async (req, res) => {
  try {
    const {
      cardStripeId, userStripeId
    } = req.query;

    await stripeSecretKeyClient.customers.deleteSource(
      userStripeId,
      cardStripeId
    );

    return res.status(200).json({ message: 'Payment details deleted successfully' });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

export default DeletePaymentDetails;
