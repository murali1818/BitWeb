const MyBids = require('../models/mybidsmodel');
const Product=require('../models/productmodels');
exports.bidproduct = async (req, res) => {
    const userId = req.user._id;
    const username = req.user.name;
    const { bidPrice } = req.body;
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        const currentPrice = product.currentPrice;

        if (bidPrice > currentPrice) {
            product.currentPrice = bidPrice;
            product.highestBid = {
                username: username,
                userId: userId,
                price: bidPrice
            };
            await product.save();
            const existingBid = await MyBids.findOne({ userId: userId, 'bids.productId': productId });

            if (existingBid) {  
                await MyBids.findOneAndUpdate(
                    { userId: userId, 'bids.productId': productId },
                    { $set: { 'bids.$.bidPrice': bidPrice } }
                );
            } else {
                await MyBids.findOneAndUpdate(
                    { userId: userId },
                    { $push: { bids: { productId: productId, bidPrice: bidPrice } } },
                    { upsert: true } 
                );
            }
            return res.status(200).json({ success: true, message: 'Bid placed successfully' });
        } else {
            return res.status(400).json({ success: false, message: 'Bid price must be higher than current price' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.getMyBids = async (req, res) => {
    const userId = req.user._id;
    try {
        const myBids = await MyBids.findOne({ userId: userId }).populate('bids.productId');
        if (!myBids) {
            return res.status(404).json({ success: false, message: 'No bids found for this user' });
        }
        return res.status(200).json({ success: true, myBids: myBids.bids });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.deleteMyBid = async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.productId;

    try {
        const myBids = await MyBids.findOneAndUpdate(
            { userId: userId },
            { $pull: { bids: { productId: productId } } },
            { new: true }
        );

        if (!myBids) {
            return res.status(404).json({ success: false, message: 'No bids found for this user' });
        }

        return res.status(200).json({ success: true, message: 'Bid deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
