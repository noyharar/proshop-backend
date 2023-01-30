import express from "express";
var router = express.Router();
import {getProducts,getProductById,deleteProduct,createProduct,updateProduct} from "../controllers/productController.js";
import {protect, admin} from '../Middlewares/authMiddleware.js'


router.route('/').get(getProducts)
    .post(protect,admin,createProduct);
router.route('/:id').get(getProductById)
    .delete(protect, admin,deleteProduct)
    .put(protect,admin,updateProduct)



export default router;
