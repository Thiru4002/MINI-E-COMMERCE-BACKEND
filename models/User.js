const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add a name"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Please add an email"],
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,"Please add a password"],
        minlength:6,
        trim:true,
    },
    role:{
        type:String,
        enum:["customer","admin","manager"],
        default:"customer",
    },
},{timestamps:true});

userSchema.pre('save',async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword,this.password);
}

const User = mongoose.model("User",userSchema);

module.exports = User;