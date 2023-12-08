// orders.model.js

import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true
    },
    products: {
      type: Array,
      required: true
    },
    totalProducts: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    isDelivered: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const OrderModel = mongoose.model('orders', OrderSchema);

export default OrderModel;
