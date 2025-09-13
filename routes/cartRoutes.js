const express = require('express');
const {registerUser,loginUser} = require('../controllers/userController');
const {protect,restrict} = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');

const router = express.Router();

//router GET my cart..
router.get('/cart/cart',protect,cartController.getCart);

//router POST/api/cartController/createCart..
router.post('/cart',protect,cartController.addtoCart);

//router POST/api/cartController/updateCart..
router.put('/cart/:id',protect,cartController.updateCart);

//router POST/api/cartController/removeCartProducts..
router.delete('/cart/:id',protect,cartController.removeCartItem);

module.exports = router;