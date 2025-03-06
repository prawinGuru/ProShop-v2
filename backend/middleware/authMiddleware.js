import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  //read the JWT from the cookie
  token = req.cookies.jwt; //here jwt is name we set in userController while setting res.cookie

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password"); //here jwt is name we setted in userController while doing jwt.sign and it will return eevrythiing without password
      //this req above will be share with all routed nd we can access the user like req.user in any route
      next();
    } catch (error) {
      console.log(error);
      throw new Error("Not authorized,token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized,no token");
  }
});

//Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

export { admin, protect };
