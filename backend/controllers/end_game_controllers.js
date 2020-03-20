const Player = require('../models/Player');
const Winner = require('../models/Winner');

/* 
  this will proccess End Component and send temporary players data
  to {End} Component to remove it from players collection
*/

const showEndGamePage = async (request, response) => {
  try {
    const result = await Player.find();
    return response.json(result);
  } catch (error) {
    return response.json({ mgs: 'you are in end game api!' });
  }
};

/*  winner in {Board} Component will send to this controller
    and put in winners Collection and {End} Component
*/
const addToWinnerRankings = async (request, response) => {
  const Winnerdata = {
    winner_name: request.body.winner_name,
    winner_score: request.body.winner_score,
  };

  try {
    const addWinner = new Winner({
      player: Winnerdata.winner_name,
      score: Winnerdata.winner_score,
    });
    await addWinner.save();
    return response.json({
      msg: 'winner player successfully placed in Ranking',
    });
  } catch (error) {
    return response.json('cannot be add as a winner');
  }
};

/*
  the id of the current players that {showEndGamePage} Controller
  will get using this api and remove it from players collection
*/
const deleteCurrentPlayersMatch = async (request, response) => {
  const id = request.params.id;
  try {
    await Player.deleteOne({ _id: id });
    return response.json({ msg: 'player succesfully transfered as winner' });
  } catch (error) {
    return response.json({ msg: 'player cannot be deleted' });
  }
};

module.exports = {
  showEndGamePage,
  addToWinnerRankings,
  deleteCurrentPlayersMatch,
};
