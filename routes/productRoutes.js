const express = require('express');
const {registerUser,loginUser} = require('../controllers/userController');
const {protect,restrict} = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');

const router = express.Router();

//route GET/api/productController/getProduct..
router.get('/products',productController.getProduct);

//route GET By Id/api/productController/getProductById..
router.get('/products/:id',productController.getProductById);

module.exports = router;
