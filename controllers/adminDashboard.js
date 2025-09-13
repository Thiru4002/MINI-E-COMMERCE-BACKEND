const User = require('../models/User');
const Order = require('../models/order');
const Product = require('../models/product');

const getDashboard = async (req,res,next) => {
    try{
        const totalCustemer = await User.countDocuments({role:"customer"});

        const totalOrder = await Order.countDocuments();

        const deliveredOrder = await Order.find({status:"delivered"});

        const totalRevenue = deliveredOrder.reduce((acc,order) => acc +order.totalPrice,0);

        const totalProduct = await Product.countDocuments();

        res.status(200).json({
            success:true,
            stats:{
                totalCustemer,
                totalOrder,
                totalRevenue,
                totalProduct
            }
        });
    }catch(err){
        next(err);
    }
};

module.exports = {getDashboard};