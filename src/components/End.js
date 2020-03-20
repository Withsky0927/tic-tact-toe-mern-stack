import React, { Component } from 'react';
import axios from 'axios';

class End extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winnerPlayer: undefined,
      winnerPlayerScore: undefined,
      WinnerPlayerID: undefined,
      isDeleted: false,
    };
  }

  componentDidUpdate() {
    if (this.state.isDeleted === true) {
      localStorage.removeItem('playerOneScore');
      localStorage.removeItem('playerTwoScore');
      localStorage.removeItem('drawCount');

      setTimeout(() => window.location.reload(), 500);
    }
  }

  addPlayerstoWinner = async () => {
    try {
      await axios.post('http://localhost:5000/end', {
        winner_name: this.state.winnerPlayer,
        winner_score: this.state.winnerPlayerScore,
      });
    } catch (error) {
      console.log('player cannot add to winner');
    }
  };

  deleteCurrentPlayer = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/end/delete/${this.state.WinnerPlayerID}`,
      );
      this.setState({ isDeleted: true });
    } catch (error) {
      console.log('current player cannot be deleted!');
    }
  };

  checkPlayerScore = (playerOneName, playerTwoName, playerId) => {
    const playerOneScore = localStorage.getItem('playerOneScore');
    const playerTwoScore = localStorage.getItem('playerTwoScore');
    if (playerOneScore > playerTwoScore) {
      this.setState({
        winnerPlayer: playerOneName,
        winnerPlayerScore: playerOneScore,
        WinnerPlayerID: playerId,
      });
      this.addPlayerstoWinner();
      this.deleteCurrentPlayer();
    } else if (playerOneScore < playerTwoScore) {
      this.setState({
        winnerPlayer: playerTwoName,
        winnerPlayerScore: playerTwoScore,
        WinnerPlayerID: playerId,
      });
      this.addPlayerstoWinner();
      this.deleteCurrentPlayer();
    } else if (playerOneScore === playerTwoScore) {
      this.setState({
        winnerPlayer: playerTwoName,
        winnerPlayerScore: playerTwoScore,
        WinnerPlayerID: playerId,
      });
      this.deleteCurrentPlayer();
    }
  };

  getWinnerPlayerData = async () => {
    try {
      const responseData = await axios.get('http://localhost:5000/end');
      const currPlayerOneName = responseData.data[0].player_one;
      const currPlayerTwoName = responseData.data[0].player_two;

      const playerId = responseData.data[0]._id;

      this.checkPlayerScore(currPlayerOneName, currPlayerTwoName, playerId);
    } catch (error) {
      console.log('cannot get The player Data');
    }
  };

  componentDidMount() {
    this.getWinnerPlayerData();
  }

  render() {
    return <></>;
  }
}
export default End;
