import Notification from '../../models/notification';

const mongoose = require('mongoose');

const ReadNotification = async (req, res) => {
  try {
    const { notificationId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      return res.status(400).json({ error: 'Invalid notificationId' });
    }

    const updatedNotification = await Notification.updateOne(notificationId, { isRead: true });

    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    return res.status(200).json(updatedNotification);
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

export default ReadNotification;
