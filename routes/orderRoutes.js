const express = require('express');
const {registerUser,loginUser} = require('../controllers/userController');
const {protect,restrict} = require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');

const router = express.Router();

//router POST/api/orderController/createOrder..
router.post('/orders',protect,orderController.placeDirectOrder);

//router POST/api/orderController/createCartOrder..
router.post('/orders/cart',protect,orderController.placeCartOrder);

//router POST/api/orderController/MyOrder..
router.get('/orders/myOrders',protect,orderController.getMyOrders);

//router DELETE/api/orderController/deleteOrder..
router.delete('/orders/deleteOrder/:orderId',protect,orderController.cancelOrder);

module.exports = router;