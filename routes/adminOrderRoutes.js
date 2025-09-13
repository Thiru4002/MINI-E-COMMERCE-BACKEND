const express = require("express");
const orderController = require('../controllers/adminOrderController');
const {protect,restrict} = require('../middlewares/authMiddleware');

const router = express.Router();

//all routes are admin protect..
router.use(protect,restrict("admin","manager"));

//view order..
router.get('/orders',orderController.getAllOrders);

//update order status..
router.put('/orders/:orderId',restrict("admin"),orderController.updateOrderStatus);

//count all orders..
router.get('/orders/count',orderController.countOrders);

module.exports = router;