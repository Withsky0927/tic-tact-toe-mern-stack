const Player = require('../models/Player');

const checkIfExist = (data) => {
  const result = data;

  if (!result) {
    return false;
  } else {
    return true;
  }
};

const blockBoardRoute = async (request, response, next) => {
  try {
    const playerData = await Player.find();
    if (!checkIfExist(playerData))
      return response
        .status(403)
        .json({
          msg: 'you are not allowed to play if there are new players set',
        });
    else next();
  } catch (error) {
    return response
      .status(403)
      .json({
        msg: 'you are not allowed to play if there are new players set',
      });
  }
};

module.exports = {
  blockBoardRoute,
};
