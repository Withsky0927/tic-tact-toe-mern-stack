/*
  the function of this component is validate, create new players for game use
*/

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOne: {
        score: 0,
        name: '',
      },
      playerTwo: {
        score: 0,
        name: '',
      },
      isnewPlayerAdded: false, // if set to true the page will reload,
    };
  }
  componentDidUpdate() {
    if (this.state.isnewPlayerAdded === true) {
      setTimeout(() => window.location.reload(), 300);
    }
  }

  async componentDidMount() {
    try {
      const thereArePlayers = await axios.get(
        'http://localhost:5000/board/playing',
      );
      if (thereArePlayers.data[0].isPlaying) {
        this.setState({ isnewPlayerAdded: true });
      }
    } catch (error) {
      console.log('there are no players');
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  /* send notification for user that player name is already exist */
  checKWinnerPlayerIfExist = async (name) => {
    try {
      const existPlayer = await axios.get(
        `http://localhost:5000/new/exist?name=${name}`,
      );
      if (existPlayer.data) {
        return true;
      } else if (!existPlayer.data) {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  /* check if new player one name is alreadyx exist or not */
  processPlayerOneData = async (event) => {
    const name = event.target.value;
    try {
      const winnerPlayerExist = await this.checKWinnerPlayerIfExist(name);
      if (winnerPlayerExist) {
        alert('Player One name is Available, Please use another one');
        this.setState((prevState) => ({
          playerOne: {
            score: 0,
            name: '',
          },
        }));
      } else if (!winnerPlayerExist) {
        this.setState((prevState) => ({
          playerOne: {
            score: 0,
            name: name,
          },
        }));
      }
    } catch (error) {
      console.log({ mgs: error });
    }
  };

  /* check if new player two name is alreadyx exist or not */
  processPlayerTwoData = async (event) => {
    const name = event.target.value;

    try {
      const winnerPlayerExist = await this.checKWinnerPlayerIfExist(name);
      if (winnerPlayerExist) {
        alert('Player Two name is Available, Please use another one');
        this.setState((prevState) => ({
          playerTwo: {
            score: 0,
            name: '',
          },
        }));
      } else if (!winnerPlayerExist) {
        this.setState((prevState) => ({
          playerTwo: {
            score: 0,
            name: name,
          },
        }));
      }
    } catch (error) {
      console.log({ mgs: error });
    }
  };

  validateField = () => {
    const checkplayerOneIfEmpty = !this.state.playerOne.name ? false : true;
    const checkplayerTwoIfEmpty = !this.state.playerTwo.name ? false : true;

    if (!checkplayerOneIfEmpty || !checkplayerTwoIfEmpty) {
      return false;
    } else {
      return true;
    }
  };

  /*  if new data has been qualified and validated, send it in api
      and create a temporary data for just a current match only
  */
  sendDataToServer = async (playerOne, playerTwo) => {
    const playerOneData = playerOne;
    const playerTwoData = playerTwo;

    try {
      await axios.post('http://localhost:5000/new', {
        playerOneData: playerOneData,
        playerTwoData: playerTwoData,
      });
      this.setState({
        isnewPlayerAdded: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* check if the players name does not exist in winner Collection */
  createNewPlayers = async (event) => {
    const isSet = this.validateField();
    if (isSet === true) {
      this.sendDataToServer(this.state.playerOne, this.state.playerTwo);
    } else {
      alert('all Fields must not be empty or not exist in ScoreBoard!');
    }
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Tic Tac Toe | New Game</title>
        </Helmet>
        <div
          id="main-page"
          className="columns is-mobile is-multiline is-centered"
        >
          <div className="column is-12">
            <div className="container">
              <div className="columns is-desktop is-multiline is-centered">
                <div
                  className="column is-10-touch is-6-desktop"
                  id="create-player-form-container"
                >
                  <form
                    onSubmit={this.handleSubmit}
                    className="columns is-mobile is-centered is-multiline"
                    autoComplete="off"
                  >
                    <div className="column is-12-touch is-6-desktop">
                      <div className="field">
                        <label className="label" htmlFor="player-one-name">
                          Player 1
                        </label>
                        <div className="control">
                          <input
                            type="text"
                            id="player-one-name"
                            className="input"
                            maxLength="50"
                            required
                            onChange={this.processPlayerOneData}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="column is-12-touch is-6-deskto">
                      <div className="field">
                        <label className="label" htmlFor="player-one-name">
                          Player 2
                        </label>
                        <div className="control">
                          <input
                            type="text"
                            id="player-two-name"
                            className="input"
                            maxLength="50"
                            required
                            onChange={this.processPlayerTwoData}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="column is-5">
                      <div className="container">
                        <div className="field is-grouped">
                          <div className="control">
                            <button
                              type="submit"
                              className="button is-link"
                              onClick={this.createNewPlayers}
                            >
                              Create
                            </button>
                          </div>
                          <div className="control">
                            <Link to="/">
                              <div className="button is-link is-light">
                                Cancel
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default New;
