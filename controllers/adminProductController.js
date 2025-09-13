const Product = require('../models/product');

const createProduct = async (req , res , next) =>{
    try{
        const {name,description,price,category,stock} = req.body;

        if(!name || !price || !category){
            return res.status(400).json({message:"Name,category and price field are must need"});
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            seller:req.user.id,
        });

        res.status(201).json({
            message:"Product created successfully",
            data:{
                product,
            },
        });
    }catch(err){
        next(err);
    }
};

const updateProduct = async (req,res,next) => {
    try{
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true,runValidators:true}
        );

        if(!product){
            return res.status(404).json({message:"Product is not found"});
        }

        res.status(200).json({
            message:"Product updated successfully",
            data:product
        });
    }catch(err){
        next(err);
    }
};

//delete Product..

const deleteProduct = async (req,res,next) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);

        if(!product){
            return res.status(404).json({message:"product is not found"});
        }

        res.status(200).json({message:"Product deleted success",Data:product});
    }catch(err){
        next(err);
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct
};