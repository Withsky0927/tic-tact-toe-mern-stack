const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  player_one: {
    type: String,
    required: true,
    max: 50,
  },
  player_two: {
    type: String,
    required: true,
    max: 50,
  },
  isPlaying: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('players', playerSchema);
