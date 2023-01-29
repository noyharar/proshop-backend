import express from "express";
var router = express.Router();
import {authUser, registerUser, getUserProfile, updateUserProfile, getUsers} from "../controllers/userController.js";
import {protect, admin} from "../Middlewares/authMiddleware.js";

router.post('/login', authUser);
router.route('/').post(registerUser).get(protect,admin,getUsers);
router.route('/profile').get(protect ,getUserProfile);
router.route('/profile').put(protect ,updateUserProfile);



export default router;