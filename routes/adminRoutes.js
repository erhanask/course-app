const adminController = require('../controllers/adminController');
const express = require('express');
const authMiddleware = require("../middlewares/auth");
const userController = require("../controllers/userController");
const router = express.Router();

router.get('/', authMiddleware.role('admin'), adminController.getIndex);
router.post('/user/delete', authMiddleware.role('admin'), userController.deleteUser);


module.exports = router;