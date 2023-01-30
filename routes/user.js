import express from "express";
var router = express.Router();
import {authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} from "../controllers/userController.js";
import {protect, admin} from "../Middlewares/authMiddleware.js";

router.route('/login').post(authUser);
router.route('/').post(registerUser).get(protect,admin,getUsers);
router.route('/profile').get(protect ,getUserProfile).put(protect ,updateUserProfile);
router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);



export default router;