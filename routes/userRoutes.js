const express = require('express');
const {registerUser,loginUser,logoutUser} = require('../controllers/userController');
const {protect,restrict} = require('../middlewares/authMiddleware');

const router = express.Router();

//route POST/api/users/register..
router.post("/register",registerUser);

//route POST/api/users/login..
router.post('/login',loginUser);

//router POST/api/users.logout..
router.post("/logout",protect,logoutUser);


module.exports = router;