const User = require('../models/User');

const getAllUsers = async (req,res,next) => {
    try{
        let queryObj = {};

        if(req.query.search){
            queryObj.name = {$regex:req.query.search,$options:'i'};
        }

        if(req.query.role){
            queryObj.role = req.query.role;
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page -1 )*limit;

        const users = await User.find(queryObj)
        .skip(skip)
        .limit(limit)
        .select("-password");

        const totalUsers = await User.countDocuments(queryObj);

        res.status(200).json({
            success:true,
            count:users.length,
            totalUsers,
            page,
            totalPages:Math.ceil(totalUsers/limit),
            users
        });
    }catch(err){
        next(err);
    }
};

const getUserById = async (req,res,next) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id).select("-password");

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        res.status(200).json({user});
    }catch(err){
        next(err);
    }
};

const updateUser = async (req,res,next) => {
    try{
        const {id} = req.params;
        const {role} = req.body;

        const validRole = ["manager","admin"];

        if(!validRole.includes(role)){
            return res.status(400).json({message:"Invalid role"});
        }

        const user = await User.findByIdAndUpdate(
            id,
            {role},
            {new:true , runValidators:true}
        ).select("-password");

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        res.status(200).json({
            message:"Role updated successfully",
            user
        });
    }catch(err){
        next(err);
    }
};

const deleteUser = async (req,res,next) => {
    try{
        const {id} = req.params;

        const user = await User.findByIdAndDelete(id);

        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({message:"User deleted successfully"});
    }catch(err){
        next(err);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};