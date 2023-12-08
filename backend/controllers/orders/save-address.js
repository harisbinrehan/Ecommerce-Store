import Address from '../../models/address';

const SaveAddress = async (req, res) => {
  try {
    const {
      userId,
      ...addressInfo
    } = req.body;

    const existingAddress = await Address.findOne({ userId });

    if (existingAddress) {
      const existingAddressInfo = existingAddress.addressInfo.find(
        (address) => JSON.stringify(address) === JSON.stringify(addressInfo)
      );

      if (!existingAddressInfo) {
        if (addressInfo.isDefault === true) {
          existingAddress.addressInfo.forEach((info) => {
            info.isDefault = false;
          });
        }

        existingAddress.addressInfo.push(addressInfo);
        await existingAddress.save();
      }
    } else {
      const newAddress = new Address({
        userId,
        addressInfo: {
          ...addressInfo,
          isDefault: true
        }
      });

      await newAddress.save();
    }

    res.status(201).json({ message: 'Address has been saved successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default SaveAddress;
