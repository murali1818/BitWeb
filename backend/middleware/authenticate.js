const jwt = require('jsonwebtoken');
const User = require('../models/usermodels');
const Product=require('../models/productmodels')
//authenticate the login user
exports.isauthenticateuser = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if (!token) {
            return res.status(401).json({ success: false, message: "Login to acces" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};
//authenticate the product ownership
exports.checkProductOwnership = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const userId = req.user._id; // Assuming you have userId stored in req.user._id after authentication

        // Find the product by ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        if (product.ownerId.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: 'You are not authorized to delete this product' });
        }

        // If the user is the owner, proceed to the next middleware or route handler
        next();
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.checkProductOwnershipForBid = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const userId = req.user._id; // Assuming you have userId stored in req.user._id after authentication

        // Find the product by ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Check if the current user is the owner of the product
        if (product.ownerId.toString() === userId.toString()) {
            return res.status(403).json({ success: false, message: 'Owners cannot bid on their own products' });
        }

        // If the user is not the owner, proceed to the next middleware or route handler
        next();
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};