const express=require('express');
const {isauthenticateuser,checkProductOwnership,checkProductOwnershipForBid}=require('../middleware/authenticate');
const { getProducts, addProducts,getsingleProduct, updateProduct,deleteProduct,getUserProducts} = require('../controllers/productController');
const {bidproduct,getMyBids,deleteMyBid}=require('../controllers/bidController')
const {registerUser, login, logout, forgetpassword, resetpassword, myprofile, changepassword} = require('../controllers/authController');
const {addToWatchlist,removeFromWatchlist,getWatchlist} = require('../controllers/watchlistController');
const router=express.Router();
//product route
router.route('/getproduct').get(getProducts);
router.route('/addproduct').post(isauthenticateuser,addProducts);
router.route('/getproduct/:id').get(isauthenticateuser,getsingleProduct);
router.route('/updateproduct/:id').put(isauthenticateuser,checkProductOwnership,updateProduct);
router.route('/deleteproduct/:id').delete(isauthenticateuser,checkProductOwnership,deleteProduct);
router.route('/myproduct/').get(isauthenticateuser,getUserProducts);
//bidding routes
router.route('/bidproduct/:id').put(isauthenticateuser,checkProductOwnershipForBid,bidproduct);
router.route('/mybids').get(isauthenticateuser, getMyBids);
router.route('/mybids/:productId').delete(isauthenticateuser, deleteMyBid);
//user routes
router.route('/register').post(registerUser);
router.route('/login').post (login);
router.route('/logout').post(logout);
router.route('/password/forgot').post(forgetpassword);
router.route('/password/reset/:token').post(resetpassword);
router.route('/myprofile').get(isauthenticateuser,myprofile);
router.route('/changepassword').post(isauthenticateuser,changepassword);
//watch list routes
router.route('/watchlist/:productId').post(isauthenticateuser, addToWatchlist);
router.route('/watchlist/:productId').delete(isauthenticateuser, removeFromWatchlist);
router.route('/watchlist').get(isauthenticateuser, getWatchlist);

module.exports=router