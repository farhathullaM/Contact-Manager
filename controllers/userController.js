import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

//@desc Register User
//@route POST /api/user/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }

  res.json({ msg: "User Registered" });
});

//@desc Login User
//@route POST /api/user/login
//@access User
const loginUser = asyncHandler(async (req, res) => {
  res.json({ msg: "User Logged in" });
});

//@desc Get current user
//@route GET /api/user/current
//@access User
const currentUser = asyncHandler(async (req, res) => {
  res.json({ msg: "current user info" });
});

export { registerUser, loginUser, currentUser };
