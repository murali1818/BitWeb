const Product=require('../models/productmodels');
const searchproduct=require('../utils/features');
//get all products
exports.getProducts = async (req, res) => {
    try {
        const searching=new searchproduct(Product.find(),req.query).search().filter()
        const products = await searching.query;
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getUserProducts = async (req, res) => {
    try {
        const ownerId = req.user._id;
        const userProducts = await Product.find({ ownerId });
        res.status(200).json(userProducts);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
exports.addProducts = async (req, res) => {
    try {
        const { productname, description, startingPrice, endDate, category,image} = req.body;
        const filename = image.split('\\').pop();
        const imagePath = './images/products/' + filename; 
        const ownerId = req.user._id;
        const ownername = req.user.name;
        const product = new Product({ productname, description, startingPrice, endDate, ownerId, ownername, category ,image:imagePath});
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.getsingleProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Product not found' });
        }
        const currentUser = req.user;
        console.log(product.image)
        res.status(200).json({ 
            success: true, 
            data: {
                product: product,
                currentUser: currentUser // Including the current user in the response
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message });
    }
};
// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;
        const product = await Product.findByIdAndUpdate(productId, updateData, { new: true ,runValidators:true});
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product updated successfully', data: product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Find the product by ID and delete it
        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


