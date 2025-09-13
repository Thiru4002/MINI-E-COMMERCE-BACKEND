const express = require("express");
const userController = require('../controllers/adminUserController');
const {protect,restrict} = require('../middlewares/authMiddleware');

const router = express.Router();

//all routes are admin protect..
router.use(protect,restrict("admin","manager"));

//get all user..
router.get('/users',userController.getAllUsers);

//get user by id..
router.get('/users/:id',userController.getUserById);

//update user..
router.put('/users/:id',userController.updateUser);

//delete user..
router.delete('/users/:id',userController.deleteUser);

module.exports = router;