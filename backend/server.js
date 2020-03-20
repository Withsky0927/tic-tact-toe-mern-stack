const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose').set('debug', true);

dotenv.config();

const PORT = process.env.DEV_PORT || process.env.PORT;
const DB = process.env.DB_CONNECTION;
const server = express();

// include body parser
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
// include cors
server.use(cors());

// include some basic security features
server.use(helmet.xssFilter());
server.use(helmet.frameguard());
server.use(helmet.hidePoweredBy());
server.use(helmet.ieNoOpen());

// include morgan logger
server.use(logger('dev'));

mongoose.connect(
  DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log('connected to database');
  },
);

//import all important routes
server.use('/', require('./routes/index_routes'));
server.use('/new', require('./routes/create_player_routes'));
server.use('/scores', require('./routes/show_all_player_score'));
server.use('/board', require('./routes/board_routes'));
server.use('/end', require('./routes/end_game_routes'));

server.listen(PORT, () => console.log(`server is listening at port:${PORT}`));
