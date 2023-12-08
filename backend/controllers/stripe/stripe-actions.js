import CreateCustomer from './utils/create-customer';
import SetStatusPaidOnChargeCustomer from './utils/set-status-paid';

const StripeActions = async (req, res) => {
  try {
    if (req.body.type === 'customer.created') {
      await CreateCustomer(req);
    } else if (req.body.type === 'charge.succeeded') {
      await SetStatusPaidOnChargeCustomer(req);
    }

    res.status(200).json('OK');
  } catch (err) {
    res
      .status(500)
      .json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default StripeActions;
