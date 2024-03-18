const mongoose = require('mongoose');
const myBidsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bids: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        bidPrice: {
            type: Number,
            required: true
        },
    }]
});
const MyBids = mongoose.model('MyBids', myBidsSchema);
module.exports = MyBids;
