import express from 'express';
import passport from 'passport';

import saveAddress from '../controllers/orders/save-address';
import UpdateDefaultAddress from '../controllers/orders/update-default-address';
import SavePaymentDetails from '../controllers/orders/save-payment-details';
import GetAllOrders from '../controllers/orders/get-orders';
import SetOrderAsDelivered from '../controllers/orders/set-isDelivered';
import GetAdminOrderStats from '../controllers/orders/get-admin-order-stats';
import {
  DeletePaymentDetails,
  EditPaymentDetails,
  GetAddress,
  GetOrderStats,
  GetPaymentDetails,
  GetUserOrders,
  PlaceOrder
} from '../controllers/orders';

const router = express.Router();

router.post(
  '/order',
  passport.authenticate('jwt', { session: false }),
  PlaceOrder
);

router.get(
  '/orders',
  passport.authenticate('jwt', { session: false }),
  GetAllOrders
);

router.get(
  '/userOrders',
  passport.authenticate('jwt', { session: false }),
  GetUserOrders
);

router.post(
  '/address',
  passport.authenticate('jwt', { session: false }),
  saveAddress
);

router.get(
  '/address',
  passport.authenticate('jwt', { session: false }),
  GetAddress
);

router.put(
  '/address',
  passport.authenticate('jwt', { session: false }),
  UpdateDefaultAddress
);

router.put(
  '/setIsDelivered',
  passport.authenticate('jwt', { session: false }),
  SetOrderAsDelivered
);

router.get(
  '/dashboardStats',
  passport.authenticate('jwt', { session: false }),
  GetOrderStats
);

router.get(
  '/stats',
  passport.authenticate('jwt', { session: false }),
  GetAdminOrderStats
);

router.post(
  '/paymentDetails',
  passport.authenticate('jwt', { session: false }),
  SavePaymentDetails
);

router.get(
  '/paymentDetails',
  passport.authenticate('jwt', { session: false }),
  GetPaymentDetails
);

router.put(
  '/paymentDetails',
  passport.authenticate('jwt', { session: false }),
  EditPaymentDetails
);

router.delete(
  '/paymentDetails',
  passport.authenticate('jwt', { session: false }),
  DeletePaymentDetails
);

export default router;
