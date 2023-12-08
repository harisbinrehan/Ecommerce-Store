import { stripeSecretKeyClient } from '../../config/config';

const EditPaymentDetails = async (req, res) => {
  try {
    const {
      userStripeId, cardStripeId, paymentDetails
    } = req.body;

    await stripeSecretKeyClient.customers.updateSource(
      userStripeId,
      cardStripeId,
      {
        exp_month: paymentDetails.exp_month,
        exp_year: paymentDetails.exp_year
      }
    );

    return res.status(200).json({ message: 'Payment details updated successfully' });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

export default EditPaymentDetails;
