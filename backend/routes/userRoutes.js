import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUsersById,
  updateUser,
} from "../controllers/userController.js";
import { protect,admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect,admin,getUsers); //set the middleware protect->must have logged in to use this api and he/she should be admin to use these api
router.post("/logout", logoutUser);
router.post("/auth", authUser); //loginUser//here user logins,,and jwt token will be set as cookie in here
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);//here u must be login but you dont have to be admin so that protect only
router.route("/:id").delete(protect,admin,deleteUser).get(protect,admin,getUsersById).put(protect,admin,updateUser);//here protect->must have logged in to use this api and he/she should be admin to use these api

export default router;
