import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import './App.scss';
import Main from './components/Main.js';
import New from './components/New.js';
import Score from './components/Score.js';
import Board from './components/Board.js';
import End from './components/End.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
  }

  async componentDidMount() {
    try {
      const alreadyPlaying = await axios.get(
        'http://localhost:5000/board/playing',
      );

      if (alreadyPlaying.data[0].isPlaying) {
        this.setState({ isPlaying: true });
      }
    } catch (error) {
      this.setState({ isPlaying: false });
    }
  }

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" exact>
              {this.state.isPlaying ? <Redirect to="/board" /> : <Main />}
            </Route>
            <Route path="/new">
              {this.state.isPlaying ? <Redirect to="/board" /> : <New />}
            </Route>
            <Route path="/scores">
              {this.state.isPlaying ? <Redirect to="/board" /> : <Score />}
            </Route>
            <Route path="/board">
              {!this.state.isPlaying ? <Redirect to="/" /> : <Board />}
            </Route>
            <Route path="/end">
              {!this.state.isPlaying ? <Redirect to="/" /> : <End />}
            </Route>
            <Route path="*">
              {this.state.isPlaying ? <Redirect to="/board" /> : <Main />}
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
