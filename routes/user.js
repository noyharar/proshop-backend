import express from "express";
var router = express.Router();
import {authUser, registerUser, getUserProfile} from "../controllers/userController.js";
import {protect} from "../Middlewares/authMiddleware.js";

router.post('/login', authUser);
router.post('/', registerUser);
router.route('/profile').get(protect ,getUserProfile);



export default router;