const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const mongoSanitize = require('mongo-sanitize');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const adminProductRoutes = require('./routes/adminProductRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
const adminDashboardRoutes = require('./routes/adminDashboardRoutes');

dotenv.config();
connectDB();

const app = express();

//---Security Middleware---//
app.use(helmet());
//mongo sanitize..
app.use((req,res,next)=>{
    if(req.body) req.body = mongoSanitize(req.body);
    if(req.params) req.params = mongoSanitize(req.params);

    next();
});

app.use(cors());

//rate limiter for api..
const limiter = rateLimit({
    windowMs:15*60*1000,
    max:100,
    message:"Too many request from Ip, please try again later"
});

app.use('/api',limiter);

app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api",productRoutes);
app.use('/api',orderRoutes);
app.use('/api',cartRoutes);
app.use('/api/admin',adminUserRoutes);
app.use('/api/admin',adminProductRoutes);
app.use('/api/admin',adminOrderRoutes);
app.use('/api/admin',adminDashboardRoutes);

app.use((err , req , res , next)=>{
    console.error(err.stack);
    res.status(err.status || 500).json({error:err.message || "something went wrong"});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});