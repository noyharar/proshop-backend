var express = require('express');
var router = express.Router();
var productController= require('../controllers/productController');

/* GET products listing. */
router.get('/', productController.getProducts);

/* GET product by id*/
router.get('/:id',productController.getProductById);



module.exports = router;
