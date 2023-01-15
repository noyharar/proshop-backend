var express = require('express');
var router = express.Router();
const Product = require('../models/product');
var asyncHandler = require('express-async-handler')
/* GET products listing. */

router.get('/',
    asyncHandler(async (req, res) =>  {
  const products = await Product.find({});
  res.json(products);
})
);
router.get('/:id',
asyncHandler(async (req, res) =>  {
  const product = await Product.findById(req.params.id)
  if(product){
    res.json(product);
  }else{
    res.status(404).json({message : 'Product not found'})
  }
})
);

router.get('/:id', function(req, res, next) {
  const product = products.find((p) => p._id === req.params.id);
  res.send(product);
});

module.exports = router;
