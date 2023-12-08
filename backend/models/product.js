import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  sold: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  images: {
    type: Array,
    required: false
  }
});

const ProductModel = mongoose.model('products', ProductSchema);

export default ProductModel;
