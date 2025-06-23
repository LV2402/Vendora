import mongoose from 'mongoose';

const SellerSchema = new mongoose.Schema({
  sellername: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  }
});

const Seller = mongoose.model('seller', SellerSchema);
export default Seller;