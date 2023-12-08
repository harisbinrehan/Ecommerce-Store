import express from 'express';
import passport from 'passport';

import ResetPassword from '../controllers/auth/reset-password';
import {
  SignIn,
  SignUp,
  ForgotPassword,
  VerifyUser,
  VerifyToken,
  GoogleSignin
} from '../controllers/auth';

const router = express.Router();

router.post('/signin', SignIn);

router.post('/signup', SignUp);

router.post('/sendEmail', ForgotPassword);

router.post('/resetPassword', ResetPassword);

router.post('/googleSignin', GoogleSignin);

router.post(
  '/verifyUser',
  passport.authenticate('jwt', { session: false }),
  VerifyUser
);

router.post(
  '/verifyToken',
  passport.authenticate('jwt', { session: false }),
  VerifyToken
);

export default router;
