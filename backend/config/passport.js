import passport from 'passport';
import jwt from 'passport-jwt';

import { PASSPORT_SECRET_KEY } from './config';
import User from '../models/user';

const JwtStrategy = jwt.Strategy;
const { ExtractJwt } = jwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PASSPORT_SECRET_KEY
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await User.findOne({ email: jwtPayload.email });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);
