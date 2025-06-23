import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stockavailability: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,  // This is the seller’s MongoDB _id
      ref: 'seller',                         
      required: true,
    },
});

const Product=mongoose.model('product', ProductSchema);
export default Product;