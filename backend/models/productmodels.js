const mongoose = require('mongoose');

// Define the Product schema
const allowedCategories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];
const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    description: String,
    startingPrice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        default: function() {
            return this.startingPrice;
        }
    },
    PostedDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    ownername: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model's ObjectId
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: allowedCategories // Validate against allowed categories
    },
    image:{
            type: String,
            default: './images/No.png' 
    },
    highestBid: {
        username: String,
        userId: mongoose.Schema.Types.ObjectId,
        price: Number
    }
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
