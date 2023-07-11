const adminController = require('../controllers/adminController');
const express = require('express');
const router = express.Router();

router.route('/').get(adminController.getIndex);

module.exports = router;