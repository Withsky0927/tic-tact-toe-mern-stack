const Winner = require('../models/Winner');

const showScorePage = async (request, response) => {
  try {
    const winners = await Winner.find().sort({ score: -1 });
    console.log(winners);
    response.json(winners);
  } catch (err) {
    response.json({ message: err });
  }
};

module.exports = {
  showScorePage,
};
