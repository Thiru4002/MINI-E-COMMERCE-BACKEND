const Order = require("../models/order");
const Product = require("../models/product");
const Cart = require('../models/cart');

const placeDirectOrder = async (req , res , next) => {
    try{
        const {products} = req.body;

        if(!products || products.length === 0){
            return res.status(400).json({message:"No products provided"});
        }

        let orderItems = [];
        let totalPrice = 0;

        for(let item of products){
            const product = await Product.findById(item.productId);
            if(!product){
                return res.status(404).json({message:`Product not found:${item.productId}`});
            }

            const price = product.price;
            const quantity = item.quantity || 1;

            if(quantity > product.stock){
                return res.status(400).json({
                    message:`Not enouhgh stock for products :${product.name}`,
                });
            }

            product.stock -= quantity;
            await product.save();

            orderItems.push({
                product:product._id,
                quantity,
                price,
            });

            totalPrice +=price*quantity;
        }
        const order = await Order.create({
            user:req.user._id,
            products:orderItems,
            totalPrice,
        });

        res.status(201).json({message:"Order placed successfully",order});
    }catch(err){
        next(err);
    }
};

const placeCartOrder = async (req, res, next) => {
    try {
        // Find the user's cart and populate product details
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        let orderItems = [];
        let totalPrice = 0;

        // Loop through cart items
        for (let item of cart.items) {
            if (!item.product) {
                return res.status(404).json({ message: "One of the products no longer exists" });
            }

            const price = item.product.price;
            const quantity = item.quantity;

            // Check stock availability
            if (quantity > item.product.stock) {
                return res.status(400).json({
                    message: `Not enough stock for product: ${item.product.name}`
                });
            }

            // Reduce product stock
            item.product.stock -= quantity;
            await item.product.save();

            // Add to order items
            orderItems.push({
                product: item.product._id,
                quantity,
                price,
            });

            // Sum total price
            totalPrice += price * quantity;
        }

        // Create order
        const order = await Order.create({
            user: req.user._id,
            products: orderItems,
            totalPrice,
        });

        // Clear cart
        cart.items = [];
        await cart.save();

        // Send response
        res.status(201).json({ message: "Order placed successfully", order });
    } catch (err) {
        next(err);
    }
};


const getMyOrders = async (req,res,next) => {
    try{
        const orders = await Order.find({user:req.user._id}).populate("products.product");

        if(!orders || orders.length === 0){
            return res.status(404).json({message:"No orders found"});
        }

        res.status(200).json({orders});
    }catch(err){
        next(err);
    }
};

const cancelOrder = async (req,res,next) => {
    try{
        const orderId = req.params.orderId;

        const order = await Order.findOne({_id:orderId,user:req.user._id});

        if(!order){
            return res.status(404).json({message:"Order not found"});
        }

        if(order.status !== "pending"){
            return res.status(400).json({message:"Only pending orders can be cancelled"});
        }

        for(let item of order.products){
            const product = await Product.findById(item.product);

            if(product){
                product.stock += item.quantity;
                await product.save();
            }
        }

        order.status = "cancelled";
        await order.save();

        res.status(200).json({
            message:"Order cancelled successfully",
            order,
        });
    }catch(err){
        next(err);
    }
};

module.exports = {
    placeDirectOrder,
    placeCartOrder,
    getMyOrders,
    cancelOrder
};