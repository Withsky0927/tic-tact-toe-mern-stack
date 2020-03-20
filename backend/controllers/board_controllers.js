const Player = require('../models/Player');

/* get new created players from database in this controller */
const checkIfPlaying = async (request, response) => {
  try {
    const playingData = await Player.find();
    return response.json(playingData);
  } catch (error) {
    return response.json({ msg: 'there are no current players!' });
  }
};

/* show board api controller */
const showBoardPage = (request, response) => {
  return response.json({ msg: 'Players is already playing' });
};

module.exports = {
  checkIfPlaying,
  showBoardPage,
};
