import express from "express";
const router = express.Router();
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
} from "../controllers/orderController.js";
import { protect,admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect,addOrderItems).get(protect,admin,getOrders); //set the middleware protect->must have logged in to use this api and he/she should be admin to use these api
router.route('/mine').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)

export default router; 