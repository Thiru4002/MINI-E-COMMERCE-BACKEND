const Order = require('../models/order');

// Admin: Get all orders
const getAllOrders = async (req, res, next) => {
  try {
    let queryObj = {};

    // Filter by status..
    if (req.query.status) {
      queryObj.status = req.query.status;
    }

    // Filter by user..
    if (req.query.userId) {
      queryObj.user = req.query.userId;
    }

    // Pagination..
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find(queryObj)
      .populate("user", "name email") // get user details..
      .populate("products.product", "name price") // get product details..
      .skip(skip)
      .limit(limit);

    const totalOrder = await Order.countDocuments(queryObj);

    res.status(200).json({
      count: orders.length,
      totalOrder,
      page,
      totalPages: Math.ceil(totalOrder / limit),
      orders,
    });
  } catch (err) {
    next(err);
  }
};


const countOrders = async (req,res,next) => {
    try{
        const totalOrder = await Order.countDocuments();

        res.status(200).json({totalOrder});
    }catch(err){
        next(err);
    }
};

const updateOrderStatus = async (req,res,next) => {
    try{
        const {orderId} = req.params;
        const {status} = req.body;

        const validStatus = ["pending","shipped","delivered","cancelled"];

        if(!validStatus.includes(status)){
            return res.status(400).json({message:"Invalid Status Value"});
        }

        const order = await Order.findById(orderId);

        if(!order){
            return res.status(404).json({message:"order is not found"});
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            message:"Order status updated successfully",
            order,
        });
    }catch(err){
        next(err);
    }
};

module.exports = {
    getAllOrders,
    countOrders,
    updateOrderStatus
}