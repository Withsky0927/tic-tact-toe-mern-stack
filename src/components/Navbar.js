/*
  the function of this compoent is to provide a user to end
  by redirecting to End component and also to redirect to main menu
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start"></div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <div className="button has-text-white is-primary">
                  <strong className="has-text-white">
                    {window.location.pathname === '/board' ? (
                      <Link to="/end">End Game</Link>
                    ) : (
                      <Link to="/">Main Menu</Link>
                    )}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
