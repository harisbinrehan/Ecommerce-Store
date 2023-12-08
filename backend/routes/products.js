import express from 'express';
import passport from 'passport';

import multerConfig from '../middlewares/multerConfig';
import {
  AddProduct,
  DeleteProduct,
  UpdateProduct,
  FetchUserProducts,
  FetchAdminProducts,
  AddBulkProducts
} from '../controllers/products';

const router = express.Router();

const upload = multerConfig();

router.get('/userProducts', FetchUserProducts);

router.get(
  '/adminProducts',
  passport.authenticate('jwt', { session: false }),
  FetchAdminProducts
);

router.post(
  '/product',
  passport.authenticate('jwt', { session: false }),
  upload.any(),
  AddProduct
);

router.post(
  '/bulkProducts',
  passport.authenticate('jwt', { session: false }),
  upload.any(),
  AddBulkProducts
);

router.delete(
  '/product',
  passport.authenticate('jwt', { session: false }),
  DeleteProduct
);

router.put(
  '/product',
  passport.authenticate('jwt', { session: false }),
  upload.any(),
  UpdateProduct
);

export default router;
