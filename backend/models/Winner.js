const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const winnerSchema = Schema({
  player: {
    type: String,
    required: true,
    max: 50,
  },
  score: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('winners', winnerSchema);
