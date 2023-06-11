const categoryController = require('../controllers/categoryController');
const express = require('express');
const router = express.Router();

router.route('/create').post(categoryController.createCategory);
router.route('/').get(categoryController.getAllCategories);

module.exports = router;