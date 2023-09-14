
const dotenv = require('dotenv');
const express = require('express');
const router =express.Router();
const {registerUser,authUser,searchUsers}=require('../controllers/userControllers.js');
const {protect}=require('../middlewares/authMiddleware.js');

router.route('/').post(registerUser).get(protect,searchUsers);
router.route('/login').post(authUser);



module.exports=router;