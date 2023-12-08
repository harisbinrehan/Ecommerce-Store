import User from '../../models/user';

const VerifyUser = async (req, res) => {
  try {
    const { email } = req.user;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Not Found: User not found' });
    }
    if (user.isValidUser) {
      return res
        .status(200)
        .json({ message: 'Success: User is already verified' });
    }

    await User.updateOne({ email }, { $set: { isValidUser: true } });

    return res
      .status(200)
      .json({ message: 'Success: Verification successful' });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

export default VerifyUser;
