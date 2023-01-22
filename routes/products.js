import express from "express";
var router = express.Router();
import {getProducts,getProductById} from "../controllers/productController.js";

/* GET products listing. */
router.get('/', getProducts);

/* GET product by id*/
router.get('/:id',getProductById);



export default router;
