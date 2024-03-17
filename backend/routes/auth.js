const express = require('express')
const {isauthenticateuser}=require('../middleware/authenticate');
const {registerUser, login, logout, forgetpassword, resetpassword, myprofile, changepassword} = require('../controllers/authController')
const router = express. Router();
router.route('/register').post(registerUser);
router.route('/login').post (login);
router.route('/logout').post(logout);
router.route('/password/forgot').post(forgetpassword);
router.route('/password/reset/:token').post(resetpassword);
router.route('/myprofile').get(isauthenticateuser,myprofile);
router.route('/changepassword').post(isauthenticateuser,changepassword)
module.exports = router;