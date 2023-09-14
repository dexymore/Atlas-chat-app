const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../config/generateToken.js");

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, profilePic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const user = await User.create({
    name,
    email,
    password,
    profilePic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }
  if (!(await user.matchPassword(password))) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  if (user && (await user.matchPassword(password))) {

  
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }

});

exports.searchUsers = asyncHandler(async (req, res) => {
  const Keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find({ ...Keyword }).select("-password");
//   .find({
//     _id: { $ne: req.user._id },
//   });
    res.json(users);
});


