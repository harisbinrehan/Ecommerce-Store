import User from '../../models/user';

const VerifyToken = async (req, res) => {
  try {
    const { email } = req.user;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.tokenExpiry) {
      return res
        .status(200)
        .json({
          message: 'Token is valid', tokenExpiry: user.tokenExpiry
        });
    }
    return res.status(400).json({ message: 'Token is missing or invalid' });
  } catch (err) {
    return res.status(500).json({ message: `Internal server error: ${err.message}` });
  }
};

export default VerifyToken;
