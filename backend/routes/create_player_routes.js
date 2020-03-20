const express = require('express');
const router = express.Router();

// controllers in here
const playersController = require('../controllers/create_player_controller');
const playersMiddleware = require('../middlewares/prevent_player_creations');

router.get('/', playersController.showPlayersPage);
router.post('/', playersController.createPlayers);
router.get('/exist', playersController.checkWinnerNameIfExist);

module.exports = router;
