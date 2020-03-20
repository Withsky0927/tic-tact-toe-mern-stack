const express = require('express');
const router = express.Router();

const endGameController = require('../controllers/end_game_controllers');

router.get('/', endGameController.showEndGamePage);
router.post('/', endGameController.addToWinnerRankings);
router.delete('/delete/:id', endGameController.deleteCurrentPlayersMatch);

module.exports = router;
