const express = require('express');
const router = express.Router();

// include score controller
const scoreController = require('../controllers/scores_controllers');

router.get('/', scoreController.showScorePage);

module.exports = router;
