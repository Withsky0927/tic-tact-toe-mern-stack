const Player = require('../models/Player');

const checkIfPlayerExist = (data) => {
  if (data) return true;
  else return false;
};

const limitPlayer = async (request, response, next) => {
  try {
    const playerData = await Player.find();

    if (checkIfPlayerExist(playerData)) {
      return response
        .status(403)
        .json({ msg: 'you are not allowed to created another player' });
    } else {
      next();
    }
  } catch (error) {
    return response
      .status(403)
      .json({ msg: 'you are not allowed to created another player' });
  }
};

module.exports = {
  limitPlayer,
};
