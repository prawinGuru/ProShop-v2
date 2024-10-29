import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//Protect routes
// checks if the user has valid token
const protect = asyncHandler(async(req, res, next) => {
    let token;

    // Read the Jwt from the cookie
    // jwt -  name given while setting jwt as Http- Only cookie in userController
    token = req.cookies.jwt;

    if(token){
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');

    // allows the request to continue further / next handler
    next();
} catch (error) {
    console.log(error);
    res.status(401);
    throw new Error('Not authorized, token failed');
}
    }
    else{
        res.status(401);
        throw new Error('Not authorized, no token');
    }

});

// Admin middleware
const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
next();
    }
    else{
        res.status(401);
        throw new Error('Not authorized as admin');
    }
};

export {protect, admin};