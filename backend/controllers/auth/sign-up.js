import bcrypt from 'bcrypt';
import User from '../../models/user';
import { stripeSecretKeyClient } from '../../config/config';
import sendWelcomeEmail from '../../utils/welcome-email';
import { GenerateToken } from '../../middlewares/auth';

const SignUp = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      mobile
    } = req.body;

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: 'Username, email, and password cannot be empty' });
    }

    const existingUserWithEmail = await User.findOne({ email });

    if (existingUserWithEmail) {
      return res
        .status(409)
        .json({ message: 'Conflict: Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      mobile
    });

    const stripe = await stripeSecretKeyClient.customers.create({
      name: newUser.username,
      email: newUser.email
    });

    newUser.stripeId = stripe.id;

    const token = GenerateToken(email);

    await sendWelcomeEmail(email, token);

    await newUser.save();

    return res
      .status(201)
      .json({ message: 'Created: User created successfully' });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default SignUp;
