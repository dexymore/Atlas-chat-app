const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel.js");
const User = require("../models/userModel.js");

exports.accessChat = asyncHandler(async (req, res) => {
  let chatData;
  const { userId } = req.body;
  if (!userId) {
    throw new Error("No user id");
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        users: { $elemMatch: { $eq: req.user._id } },
      },
      {
        users: { $elemMatch: { $eq: userId } },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name Pic email",
  });

  if (isChat.length > 0) {
    res.status(200).json(isChat[0]);
  } else {
    chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      let createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id })
        .populate("users", "-password")
        .populate("latestMessage");
      res.status(201).json(fullChat);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
});

exports.getChats = asyncHandler(async (req, res) => {
  try {
    const allChats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmins", "-password")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name Pic email",
        });
        res.status(200).json(results);
      });
  } catch (error) {
    console.error(error);
    res.status(400).throw("Server Error");
  }
});

exports.createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    res.status(400);
    throw new Error("Please select users");
  }
  let users = JSON.parse(req.body.users);
  if (users.length < 2) {
    res.status(400);
    throw new Error("Please select more than 2 users");
  }
  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
exports.renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;
  if (!chatId || !chatName) {
    res.status(400).json({ message: "Please provide chat id and chatName" });
    return;
  }

  const updatedChat = await Chat.findOneAndUpdate(
    { _id: chatId },
    { $set: { chatName: chatName } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (updatedChat) {
    res.status(200).json({
      message: "Group name updated",
      chat: updatedChat,
    });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
});

exports.addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (added) {
    res.status(200).json({ message: "Added to group", chat: added });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
});

exports.removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removed= await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (removed) {
    res.status(200).json({ message: "removed from group", chat: removed });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
});  
