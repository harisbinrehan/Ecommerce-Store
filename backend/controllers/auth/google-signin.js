import { jwtDecode } from 'jwt-decode';

import User from '../../models/user';
import { GenerateToken } from '../../middlewares/auth';
import { stripeSecretKeyClient } from '../../config/config';

const GoogleSignin = async (req, res) => {
  try {
    let user = {};
    const {
      name, email, email_verified, picture
    } = jwtDecode(
      req.body.credential
    );

    const existingUserWithEmail = await User.findOne({ email });

    if (!existingUserWithEmail) {
      const stripe = await stripeSecretKeyClient.customers.create({
        name,
        email
      });
      const newUser = new User({
        username: name,
        email,
        stripeId: stripe.id,
        isValidUser: email_verified
      });

      user = await newUser.save();
    } else {
      user = await User.findOne({ email });
    }

    if (email_verified) {
      const {
        _id,
        stripeId
      } = user;
      const token = await GenerateToken(email);

      return res.status(200).json({
        username: name,
        image: picture,
        userId: _id,
        stripeId,
        email,
        token
      });
    }
    return res
      .status(401)
      .json({ message: 'Unauthorized' });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

export default GoogleSignin;
