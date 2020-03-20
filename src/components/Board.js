/*
  the function of this component is to control and manipulate
  match and also send all the score to End Component to proccess the
  score and compute the score of current game

  # players symbols
  1.player one: X
  2.player two: O

*/

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import axios from 'axios';
import Navbar from './Navbar';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playersDefaultData: [],
      playersId: '',
      playerTurnCurent: 'X',
      playerOneCount: 0,
      playerTwoCount: 0,
      playerOneName: '',
      playerTwoName: '',

      correctPatternX: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3],
        [1, 5, 9],
        [3, 5, 7],
        [9, 5, 1],
        [7, 5, 3],
      ],
      correctPatternO: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3],
        [1, 5, 9],
        [3, 5, 7],
        [9, 5, 1],
        [7, 5, 3],
      ],
    };
  }

  /* set current match to be a draw */
  turnPlayersDraw = () => {
    const checkIfDrawCount = localStorage.getItem('drawCount');
    let prevCount = 0;
    if (!checkIfDrawCount) {
      localStorage.setItem('drawCount', parseInt(0));
    } else if (checkIfDrawCount) {
      prevCount = parseInt(localStorage.getItem('drawCount'));
      prevCount = prevCount + 1;
      localStorage.setItem('drawCount', prevCount);
    }

    if (prevCount === 8) {
      alert('draw');
      localStorage.removeItem('drawCount');
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  /*  increase player one score if win and set player one
      as a winner for the current match 
   */
  turnPlayerOneWinner = () => {
    alert('player one Wins!');
    let prevValue = parseInt(localStorage.getItem('playerOneScore'));
    localStorage.setItem('playerOneScore', prevValue + 1);
    localStorage.removeItem('drawCount');
    setTimeout(() => window.location.reload(), 1000);
  };

  /*  
    increase player two score if  win and player two
    as a winner for the current match   
  */
  turnPlayerTwoWinner = () => {
    alert('player two Wins!');
    let prevValue = parseInt(localStorage.getItem('playerTwoScore'));
    localStorage.setItem('playerTwoScore', prevValue + 1);
    localStorage.removeItem('drawCount');
    setTimeout(() => window.location.reload(), 1000);
  };
  /* check all moves whose */
  componentDidUpdate() {
    if (this.state.playerOneCount === 3 && this.state.playerTwoCount < 3) {
      this.turnPlayerOneWinner();
      return;
    } else if (
      this.state.playerOneCount < 3 &&
      this.state.playerTwoCount === 3
    ) {
      this.turnPlayerTwoWinner();
    }
  }

  checkBoardTurns = (player) => {
    const playerOneCombinationIndex = this.state.correctPatternX.length;
    const playerTwoCombinationIndex = this.state.correctPatternO.length;

    const playerOneCombination = this.state.correctPatternX;
    const playerTwoCombination = this.state.correctPatternO;

    let tempCount = 0;
    if (player === 'X') {
      for (let i = 0; i < playerOneCombinationIndex; i++) {
        for (
          let x = 0, index = playerOneCombination[i].length;
          x < index;
          x++
        ) {
          if (playerOneCombination[i][x] === undefined) {
            if (tempCount === 3) {
              break;
            }
            tempCount = tempCount + 1;
          } else if (playerOneCombination[i][x] !== undefined) {
            tempCount = 0;
            break;
          }
        }
        if (tempCount === 3) {
          this.setState({ playerOneCount: tempCount });
          return;
        }
      }
      tempCount = 0;
    }

    if (player === 'O') {
      console.log('player:' + player);
      for (let i = 0; i < playerTwoCombinationIndex; i++) {
        for (
          let x = 0, index = playerTwoCombination[i].length;
          x < index;
          x++
        ) {
          if (playerTwoCombination[i][x] === undefined) {
            if (tempCount === 3) {
              break;
            }
            tempCount = tempCount + 1;
          } else if (playerTwoCombination[i][x] !== undefined) {
            tempCount = 0;
            break;
          }
        }
        if (tempCount === 3) {
          this.setState({ playerTwoCount: tempCount });
          return;
        }
      }
    }
  };

  /* disable empty board pieces if clicked */
  disableBoardTurn = (number, Player) => {
    const turnData = +number;

    let correctPatternX = this.state.correctPatternX;
    let correctPatternO = this.state.correctPatternO;
    const correctPatternXIndex = correctPatternX.length;
    const correctPatternOIndex = correctPatternO.length;

    if (Player === 'X') {
      for (let i = 0; i < correctPatternXIndex; i++) {
        for (let x = 0, index = correctPatternX[i].length; x < index; x++) {
          if (correctPatternX[i][x] === turnData) {
            correctPatternX[i][x] = undefined;
          }
        }
      }
    }

    if (Player === 'O') {
      for (let i = 0; i < correctPatternOIndex; i++) {
        for (let x = 0, index = correctPatternO[i].length; x < index; x++) {
          if (correctPatternO[i][x] === turnData) {
            correctPatternO[i][x] = undefined;
          }
        }
      }
    }

    this.setState({ correctPatternX });
    this.setState({ correctPatternO });
    this.checkBoardTurns(Player);
  };

  /*
    Check board if has already been clicked
    if clicked already, dont change
    {this.state.playerTurnCurent} value
  */
  checkIfHasValue = (id, clicked) => {
    if (clicked === 'X') {
      return '';
    }
    if (clicked === 'O') {
      return '';
    }
    if (!clicked) {
      if (this.state.playerTurnCurent === 'X') {
        this.setState({ playerTurnCurent: 'O' });
      } else if (this.state.playerTurnCurent === 'O') {
        this.setState({ playerTurnCurent: 'X' });
      }
      return true;
    }
  };

  /* get text on the board that has been clicked */
  updatePlayersMoves = (event) => {
    const clickData = event.target.id;
    const textData = event.target.textContent;
    const existResult = this.checkIfHasValue(clickData, textData);

    if (existResult) {
      event.target.textContent = this.state.playerTurnCurent;
      if (!this.state.playerOneCount && !this.state.playerTwoCount) {
        this.turnPlayersDraw();
      }
    } else if (existResult === '') {
      if (this.state.playerTurnCurent === textData) {
        event.target.textContent = this.state.playerTurnCurent;
      }
    }

    this.disableBoardTurn(clickData, event.target.textContent);
  };

  /* populate this.state.playersDefaultData with new players data */
  getStateDefaultPlayerData = () => {
    this.setState({
      playersId: this.state.playersDefaultData[0]._id,
      playerOneName: this.state.playersDefaultData[0].player_one,
      playerTwoName: this.state.playersDefaultData[0].player_two,
    });
  };

  /* get new players data from api */
  getPlayersData = async () => {
    try {
      const result = await axios.get('http://localhost:5000/board/playing');
      const playersDefaultData = result.data;
      this.setState({ playersDefaultData });
    } catch (error) {
      console.log('cannot get new players');
    }
  };

  /* if click button has been clicked refresh the page */
  resetBoardStyle = () => {
    setTimeout(() => window.location.reload(), 300);
  };

  /*
      Reset - this.state.correctPatternX
      Reset - this.state.correctPatternO
  */
  resetGame = () => {
    this.setState({
      correctPatternX: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3],
        [1, 5, 9],
        [3, 5, 7],
        [9, 5, 1],
        [7, 5, 3],
      ],
      correctPatternO: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3],
        [1, 5, 9],
        [3, 5, 7],
        [9, 5, 1],
        [7, 5, 3],
      ],
      playerTurnCurent: 'X',
      playerTurnOld: '',
      isReset: true,
    });
    this.resetBoardStyle();
  };

  /*
      fillup localstorage with default value for 
      Turn count 
      player one score
      player two score
  */
  async componentDidMount() {
    await this.getPlayersData();
    this.getStateDefaultPlayerData();

    const playerOneExist = localStorage.getItem('playerOneScore') || 0;
    const playerTwoExist = localStorage.getItem('playerTwoScore') || 0;
    if (!playerOneExist && !playerTwoExist) {
      localStorage.setItem('playerOneScore', 0);
      localStorage.setItem('playerTwoScore', 0);
    }
  }

  render() {
    const playerOneScore = localStorage.getItem('playerOneScore') || 0;
    const playerTwoScore = localStorage.getItem('playerTwoScore') || 0;
    return (
      <>
        <Helmet>
          <title>Tic Tac Toe | Board</title>
        </Helmet>
        <Navbar />
        <div
          id="main-page"
          className="columns is-mobile is-multiline is-centered"
        >
          <div className="column is-12">
            <div className="container">
              <div className="columns is-mobile is-multiline is-centered">
                <div className="column is-11-touch is-9-desktop">
                  <div className="columns is-mobile is-multiline is-centered">
                    <div className="column is-12-touch is-5-desktop">
                      <table
                        className="table is-bordered is-narrow"
                        id="tictactoe-table"
                      >
                        <tbody>
                          <tr className="board-rows">
                            <td
                              onClick={this.updatePlayersMoves}
                              id="1"
                              className="animated fadeIn board-pieces has-text-centered is-size-2"
                            ></td>
                            <td
                              onClick={this.updatePlayersMoves}
                              id="2"
                              className="animated fadeIn board-pieces has-text-centered is-size-2"
                            ></td>
                            <td
                              onClick={this.updatePlayersMoves}
                              id="3"
                              className="animated fadeIn board-pieces has-text-centered is-size-2"
                            ></td>
                          </tr>
                          <tr className="board-rows">
                            <td
                              onClick={this.updatePlayersMoves}
                              id="4"
                              className="animated fadeIn board-pieces has-text-centered is-size-2"
                            ></td>
                            <td
                              onClick={this.updatePlayersMoves}
                              id="5"
                              className="animated fadeIn board-pieces has-text-centered is-size-2"
                            ></td>
                            <td
                              onClick={this.updatePlayersMoves}
                              id="6"
                              className="animated fadeIn board-pieces has-text-centered is-size-2"
                            ></td>
                          </tr>
                          <tr className="board-rows">
                            <td
                              onClick={this.updatePlayersMoves}
                              id="7"
                              className="animated fadeIn board-pieces has-text-centered is-size-2"
                            ></td>
                            <td
                              onClick={this.updatePlayersMoves}
                              id="8"
                              className="animated fadeIn board-pieces has-text-centered is-size-2"
                            ></td>
                            <td
                              onClick={this.updatePlayersMoves}
                              id="9"
                              className="animated fadeIn board-pieces has-text-centered is-size-2"
                            ></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="column is-12-touch is-4-desktop"
                      id="board-controls"
                    >
                      <div className="columns is-mobile is-multiline is-centered">
                        <div className="controls-container column is-12">
                          <div className="container has-text-centered">
                            <h5 className="is-size-6">
                              <strong>PlAYER ONE: </strong>
                              {this.state.playerOneName}
                            </h5>
                            <span className="score-box">{playerOneScore}</span>
                          </div>
                        </div>
                        <div className="controls-container column is-12">
                          <div className="container has-text-centered">
                            <h5 className="is-size-6">
                              <strong>PLAYER TWO: </strong>
                              {this.state.playerTwoName}
                            </h5>
                            <span className="score-box">{playerTwoScore}</span>
                          </div>
                        </div>
                        <div className="controls-container column is-12">
                          <div className="container has-text-centered">
                            <button
                              className="button is-large"
                              id="reset-button"
                              onClick={this.resetGame}
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Board;
