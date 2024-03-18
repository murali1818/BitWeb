const Watchlist = require('../models/watchlistmodel');
const Product = require('../models/productmodels');

// Function to add a product to the watchlist
exports.addToWatchlist = async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.productId;

    try {
        // Check if the product already exists in the watchlist
        const existingWatchlist = await Watchlist.findOne({ userId: userId });
        if (existingWatchlist && existingWatchlist.products.includes(productId)) {
            return res.status(400).json({ success: false, message: 'Product already exists in the watchlist' });
        }

        // Add the product to the watchlist
        const watchlist = await Watchlist.findOneAndUpdate(
            { userId: userId },
            { $push: { products: productId } },
            { upsert: true, new: true }
        );

        return res.status(200).json({ success: true, message: 'Product added to watchlist', watchlist: watchlist });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Function to remove a product from the watchlist
exports.removeFromWatchlist = async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.productId;

    try {
        const watchlist = await Watchlist.findOneAndUpdate(
            { userId: userId },
            { $pull: { products: productId } },
            { new: true }
        );

        if (!watchlist) {
            return res.status(404).json({ success: false, message: 'Watchlist not found for this user' });
        }

        return res.status(200).json({ success: true, message: 'Product removed from watchlist', watchlist: watchlist });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Function to get the user's watchlist
exports.getWatchlist = async (req, res) => {
    const userId = req.user._id;

    try {
        const watchlist = await Watchlist.findOne({ userId: userId }).populate('products');

        if (!watchlist) {
            return res.status(404).json({ success: false, message: 'Watchlist not found for this user' });
        }

        return res.status(200).json({ success: true, watchlist: watchlist });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
