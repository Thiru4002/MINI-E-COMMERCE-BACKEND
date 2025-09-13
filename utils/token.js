const jwt = require('jsonwebtoken');

exports.generateToken = (userId) =>{
    return jwt.sign(
        {id:userId._id,role:userId.role},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );
};