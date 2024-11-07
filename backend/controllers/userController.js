import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";


// @desc   Auth user & get token
// @route  POST/api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc   Register user
// @route  Post/api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   Logout user / clear cookie
// @route  Post/api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  // here jwt as first parameter is name or key ,,with this we can access..done in authMiddleware
  // and second parameter its value
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
});

// @desc   Get user profile
// @route  Get/api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); //since this flow starts after the authMiddleware flow ,,we have the user data in req

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }else{
    res.status(400);
    throw new Error('user not found')
  }
});

// asyou can see ,when we update usua;;y send an id ..but here the user will update his ownself so jwt token will handle that
// @desc   Update user profile
// @route  PUT/api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);//since this flow starts after the authMiddleware flow ,,we have the user data in req

  if(user){
    user.name=req.body.name ||user.name //if we new body for updation,,so keep that name whatever in that body or use name already in db
    user.email=req.body.email || user.email

    if(req.body.password){
      user.password=req.body.password
    }

    const updatedUser=await user.save();//will return all updated above one//here dont confuse that we didnt use the model with save because.it will save whatever in the object "'user"

    res.status(200).json({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      isAdmin:updatedUser.isAdmin
    })
  }else{
    res.status(404);
    throw new Error('User not found')
  }
});

// @desc   Get all users
// @route  Get/api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get user ");
});

// @desc   Get user by ID
// @route  Get/api/users/:id
// @access Private/Admin
const getUsersById = asyncHandler(async (req, res) => {
  res.send("get user by id ");
});

// @desc   Delete users
// @route  Delete/api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user ");
});

// admin updates any user
// @desc   Update users
// @route  Put/api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user ");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUsersById,
  updateUser,
};
