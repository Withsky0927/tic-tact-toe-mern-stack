/*
  the function of this component is to get all history to current winners
  for all the match that has been played already and sort it by score in
  descending order
*/

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rank: 0,
      players: [],
    };
  }

  /* get all previous to current winners from scores api */
  getScores = async () => {
    try {
      const responseData = await axios.get('http://localhost:5000/scores');
      const players = responseData.data;
      this.setState({ players });
      console.log(this.state.players);
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getScores();
  }

  render() {
    let count = 1;
    const winners = this.state.players.map((winner) => {
      return (
        <tr>
          <td className="has-text-centered">{count++}</td>
          <td className="has-text-centered">{winner.player}</td>
          <td className="has-text-centered">{winner.score}</td>
        </tr>
      );
    });

    return (
      <>
        <Helmet>
          <title>Tic Tac Toe | Show Ranks</title>
        </Helmet>
        <Navbar />
        <div
          id="main-page"
          className="columns is-mobile is-multiline is-centered"
        >
          <div className="column is-12">
            <div className="columns is-multiline is-centered is-mobile">
              <div className="column is-10-mobile is-10-tablet is-5-desktop">
                <table
                  className="table is-bordered is-fullwidth"
                  id="table-container"
                >
                  <thead>
                    <tr>
                      <th className="has-text-centered">Rank</th>
                      <th className="has-text-centered">Player</th>
                      <th className="has-text-centered">Score</th>
                    </tr>
                  </thead>
                  <tbody>{winners}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Score;
