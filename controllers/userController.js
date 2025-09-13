const User = require('../models/User');
const {generateToken} = require('../utils/token');

const registerUser = async (req ,res , next) => {
    try{
        const {name,email,password} = req.body;

        const userExisting = await User.findOne({email});

        if(userExisting){
            return res.status(400).json({message:"User already exists"});
        }

        const newUser = await User.create({
            name,
            email,
            password,
        });

        const token = generateToken(newUser);

        res.status(201).json({
            message:"User register successfully",
            token,
            id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            role:newUser.role,
        });
    }catch(err){
        next(err);
    }
};

const loginUser = async (req,res,next) => {
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"User is not found"});
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(401).json({message:"Email or Password Invalid"});
        }

        const token = generateToken(user);

        res.status(200).json({
            message:"Login successfull",
            token,
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
        });
    }catch(err){
        next(err);
    }
};

const logoutUser = (req, res, next) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {registerUser,loginUser,logoutUser};