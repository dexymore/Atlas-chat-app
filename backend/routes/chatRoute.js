const express = require('express');
const dotenv = require('dotenv');
const {protect }=require('../middlewares/authMiddleware.js');
const {accessChat,getChats,renameGroup,removeFromGroup,addToGroup,createGroupChat }=require('../controllers/chatControllers.js');
const { create } = require('../models/chatModel.js');


const router =express.Router();

router.route('/').post(protect,accessChat);
router.route('/').get(protect,getChats);
router.route('/group').post(protect,createGroupChat);
router.route('/rename').put(protect,renameGroup);
router.route("/groupremove").put(protect,removeFromGroup);
router.route("/groupadd").put(protect,addToGroup);

module.exports=router;