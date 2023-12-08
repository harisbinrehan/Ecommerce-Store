import bcrypt from 'bcrypt';
import User from '../../models/user';
import { GenerateToken } from '../../middlewares/auth';

export const SignIn = async (req, res) => {
  try {
    const {
      email, password
    } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Bad Request: Email or password cannot be empty' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Not Found: User not found' });
    }

    if (!user.isValidUser) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: User account is not valid' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const {
        username, _id, stripeId, mobile, isAdmin
      } = user;

      const token = GenerateToken(email);

      return res.status(200).json({
        username,
        userId: _id,
        stripeId,
        email,
        token,
        mobile,
        isAdmin
      });
    }
    return res
      .status(401)
      .json({ message: 'Unauthorized: Invalid credentials' });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

export default SignIn;
