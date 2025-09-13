const express = require("express");
const dashboard = require('../controllers/adminDashboard');
const {protect,restrict} = require('../middlewares/authMiddleware');

const router = express.Router();

//all routes are admin protect..
router.use(protect,restrict("admin","manager"));

//status total orders,product,customers..

router.get('/dashboard',dashboard.getDashboard);

module.exports = router;