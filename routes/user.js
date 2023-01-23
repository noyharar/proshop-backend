import express from "express";
var router = express.Router();
import {authUser, registerUser, getUserProfile, updateUserProfile} from "../controllers/userController.js";
import {protect} from "../Middlewares/authMiddleware.js";

router.post('/login', authUser);
router.post('/', registerUser);
router.route('/profile').get(protect ,getUserProfile);
router.route('/profile').put(protect ,updateUserProfile);



export default router;