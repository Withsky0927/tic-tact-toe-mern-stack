const Player = require('../models/Player');
const Winner = require('../models/Winner');

const showPlayersPage = async (request, response) => {
  try {
    const result = await Player.find();
    return response.json(result);
  } catch (error) {
    return response.json({ mgs: error });
  }
};

/* get data in {New} Component and send it to the database */
const createPlayers = async (request, response) => {
  const playersInfo = {
    playerOne: {
      name: request.body.playerOneData.name,
      score: request.body.playerOneData.score,
    },
    playerTwo: {
      name: request.body.playerTwoData.name,
      score: request.body.playerTwoData.score,
    },
  };
  const players = new Player({
    player_one: playersInfo.playerOne.name,
    score_one: playersInfo.playerOne.score,
    player_two: playersInfo.playerTwo.name,
    score_two: playersInfo.playerTwo.score,
  });

  try {
    await players.save();
    return response.json({ msg: 'Players Has been Set' });
  } catch (error) {
    return response.json({ msg: error });
  }
};

/* send a validation in {New} Component if player exist in scores history */
const checkWinnerNameIfExist = async (request, response) => {
  const searchForPlayerName = request.query.name;
  try {
    const result = await Winner.findOne({ player: searchForPlayerName });
    return response.json(result);
  } catch (error) {
    return response.json({ msg: error });
  }
};
module.exports = {
  showPlayersPage,
  createPlayers,
  checkWinnerNameIfExist,
};
