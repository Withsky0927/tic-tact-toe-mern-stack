const express = require('express');
const router = express.Router();

// controllers in here
const indexController = require('../controllers/index_controllers');

router.get('/', indexController.showIndexPage);

module.exports = router;
