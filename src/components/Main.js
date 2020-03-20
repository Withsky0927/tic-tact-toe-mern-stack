/*
    the function of this component is to give a user a menu
    if user wants to see the rankings in score ascending order
    or setup a new a game
*/

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Tic Tac Toe | Withmore, George David Withmore</title>
        </Helmet>
        <div
          id="main-page"
          className="columns is-mobile is-multiline is-centered"
        >
          <div id="main-container" className="column is-12">
            <div className="container">
              <div className="columns is-mobile is-multiline is-centered">
                <div
                  id="route-box"
                  className="column is-10-mobile is-10-tablet is-4-desktop"
                >
                  <div className="columns is-mobile is-multiline is-centered">
                    <div id="main-title" className="column is-12">
                      <h1>Tic Tac Toe</h1>
                    </div>
                    <div className="column is-12 box-container">
                      <div
                        id="new-game-container-button"
                        className="button is-info link-button"
                      >
                        <Link to="/new">
                          <span className="link-style">New Game</span>
                        </Link>
                      </div>
                    </div>
                    <div className="column is-12 box-container">
                      <div
                        id="scores-container-button"
                        className="button is-info link-button"
                      >
                        <Link to="/scores">
                          <span className="link-style">Ranking</span>
                        </Link>
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
export default Main;
