const express=require('express');
const {isauthenticateuser,checkProductOwnership,checkProductOwnershipForBid}=require('../middleware/authenticate');
const { getProducts, addProducts,getsingleProduct, updateProduct,deleteProduct,getUserProducts,bidproduct} = require('../controllers/productController');
const router=express.Router();
router.route('/getproduct').get(getProducts);
router.route('/addproduct').post(isauthenticateuser,addProducts);
router.route('/getproduct/:id').get(isauthenticateuser,getsingleProduct);
router.route('/updateproduct/:id').put(isauthenticateuser,checkProductOwnership,updateProduct);
router.route('/deleteproduct/:id').delete(isauthenticateuser,checkProductOwnership,deleteProduct);
router.route('/myproduct/').get(isauthenticateuser,getUserProducts);
router.route('/bidproduct/:id').post(isauthenticateuser,checkProductOwnershipForBid,bidproduct);
module.exports=router