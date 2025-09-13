const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add the name"],
        trim:true,
        minlength:[3,"Name must be at least 3 charecters long"],
    },
    description:{
        type:String,
        trim:true,
    },
    price:{
        type:Number,
        required:[true,"add the product price"],
        min:[0,"price cannot br negaive"],
        validate:{
            validator:function (price) {
                return price >= 1 && Number.isInteger(price);
            },
            message:"Product price must atleast 1",
        }
    },
    category:{
        type:String,
        required:[true,"Product category is required"],
        trim:true,
    },
    stock:{
        type:Number,
        required:[true,"add the quantity of products"],
        validate : {
            validator:function (value) {
                return value >= 1;
            },
            message:"Stock must be at least 1"
        }
    },
    seller:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    image:{
        type:String,
        default:"https://placehold.co/400",
    }
},{timestamps:true});

const Product = mongoose.model("Product",productSchema);

module.exports = Product;