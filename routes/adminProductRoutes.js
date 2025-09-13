const express = require("express");
const productController = require('../controllers/adminProductController');
const {protect,restrict} = require('../middlewares/authMiddleware');

const router = express.Router();

//all routes are admin protect..
router.use(protect,restrict("admin","manager"));

//create product..
router.post('/products',productController.createProduct);

//update product status..
router.put('/products/:id',productController.updateProduct);

//delete product..
router.delete('/products/:id',productController.deleteProduct);

module.exports = router;