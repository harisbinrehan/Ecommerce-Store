import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  addressInfo: [
    {
      name: String,
      mobile: String,
      country: String,
      province: String,
      city: String,
      address: String,
      isDefault: Boolean
    }
  ]
});

const AddressModel = mongoose.model('addresses', AddressSchema);

export default AddressModel;
