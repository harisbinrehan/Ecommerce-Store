import { stripeSecretKeyClient } from '../../config/config';
import User from '../../models/user';

const GetPaymentDetails = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findOne({ _id: { $in: userId } });

    const cards = await stripeSecretKeyClient.customers.listSources(
      user.stripeId,
      { object: 'card' }
    );

    const allPaymentMethods = cards.data.map((card) => ({
      cardholderName: user.username,
      cardNumber: card.last4,
      cardId: card.id,
      brand: card.brand,
      exp_month: card.exp_month,
      exp_year: card.exp_year
    }));

    return res.status(200).json({ allPaymentMethods });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

export default GetPaymentDetails;
