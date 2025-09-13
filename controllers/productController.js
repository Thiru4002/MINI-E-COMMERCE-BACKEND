const Product = require('../models/product');

//get all product....

const getProduct = async (req,res,next) => {
    try{
        let queryObj = {};

        if(req.query.search) {
            queryObj.name = {$regex:req.query.search,$options:"i"};
        }

        if(req.query.category){
            queryObj.category = req.query.category;
        }

        if(req.query.minPrice || req.query.maxPrice){
            queryObj.price = {};
            if(req.query.minPrice)queryObj.price.$gte = Number(req.query.minPrice);
            if(req.query.maxPrice)queryObj.price.$lte = Number(req.query.maxPrice);
        }
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page-1)*limit;

        const products = await Product.find(queryObj).skip(skip).limit(limit);

        const totalProduct = await Product.countDocuments(queryObj);

        res.status(200).json({
            success:true,
            count:products.length,
            totalProduct,
            page,
            totalPages:Math.ceil(totalProduct/limit),
            products
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error feching products",
            error:error.message,
        });
    }
};

//get product by id...

const getProductById = async (req,res,next) => {
    try{
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }

        res.status(200).json(product);
    }catch(err){
        next(err);
    }
};


module.exports = {
    getProduct,
    getProductById,
};