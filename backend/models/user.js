import mongoose from 'mongoose';

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  mobile: {
    type: String,
    required: false
  },
  image: { type: String },
  isAdmin: { type: Boolean },
  stripeId: {
    type: String,
    default: ''
  },
  tokenExpiry: {
    type: Boolean,
    default: true
  },
  isValidUser: {
    type: Boolean,
    default: false
  }
});

const userModel = new mongoose.model('users', User);

export default userModel;
