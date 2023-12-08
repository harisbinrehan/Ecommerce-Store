import Notification from '../../models/notification';

const GetNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();

    if (notifications.length === 0) {
      return res.status(404).json({ error: 'No notifications found' });
    }

    return res.status(200).json(notifications);
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

export default GetNotifications;
