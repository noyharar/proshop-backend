import express from "express";
var router = express.Router();
import { addOrderItems , getOrderById} from "../controllers/orderController.js";
import {protect} from "../Middlewares/authMiddleware.js";

/* POST create new order */
router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);






export default router;
