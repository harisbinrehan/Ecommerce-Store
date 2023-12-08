import {
  stripePublishableClient,
  stripeSecretKeyClient
} from '../../config/config';
import User from '../../models/user';

const SavePaymentDetails = async (req, res) => {
  try {
    const {
      userId,
      paymentDetails
    } = req.body;

    const response = await User.findOne(
      { _id: userId },
      {
        stripeId: 1,
        _id: 0
      }
    );

    const { stripeId } = response;

    const {
      number, exp_month, exp_year
    } = paymentDetails;

    const card = await stripePublishableClient.tokens.create({
      card: {
        number,
        exp_month,
        exp_year,
        cvc: 123
      }
    });

    await stripeSecretKeyClient.customers.createSource(stripeId, {
      source: card.id,
      metadata: {
        cardNumber: paymentDetails.cardNumber,
        userStripeId: stripeId
      }
    });

    return res.status(201).json('Payment details saved successfully');
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default SavePaymentDetails;
