const express = require('express');
const router = express.Router();

const boardController = require('../controllers/board_controllers');
const boardMiddleware = require('../middlewares/check_players_set');

router.get('/', boardController.showBoardPage);
router.get('/playing', boardController.checkIfPlaying);

module.exports = router;
