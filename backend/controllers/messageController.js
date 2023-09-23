const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel.js');
const User = require('../models/userModel.js');
const Chat = require('../models/chatModel.js');


exports.sendMessage = asyncHandler(async (req, res) => {
const { chatId, content } = req.body;

if(!chatId || !content){
    res.status(400).json({message: 'Please provide chat id and content'})
    return
}

let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
}

try{
    let  createdMessage = await Message.create(newMessage)
    createdMessage = await createdMessage.populate('sender',"sender pic")
    createdMessage = await createdMessage.populate('chat')
    createdMessage = await User.populate(createdMessage, {path: 'chat.users', select: 'name pic email'})


    res.status(200).json(createdMessage)
}
catch(error){
    res.status(400).json({message: error.message})
}


});


exports.allMessages = asyncHandler(async (req, res) => {
try{
    const messages = await Message.find({chat: req.params.chatId}).populate('sender', 'name pic email').populate('chat')
    res.status(200).json(messages)
}
catch(error){
    res.status(400).json({message: error.message})
}



});