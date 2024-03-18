const mongoose = require('mongoose');
const watchlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }]
});
const Watchlist = mongoose.model('Watchlist', watchlistSchema);
module.exports = Watchlist;
