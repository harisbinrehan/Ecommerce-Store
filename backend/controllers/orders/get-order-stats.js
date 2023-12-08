import DashboardStats from '../../models/dashboard-stats';

const GetOrderStats = async (req, res) => {
  try {
    const statistics = await DashboardStats.find();

    return res.status(200).json({ data: statistics });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

export default GetOrderStats;
