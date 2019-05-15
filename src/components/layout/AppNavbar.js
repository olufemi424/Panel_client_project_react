import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { firebaseConnect } from "react-redux-firebase";

class AppNavbar extends Component {
  state = {
    isAuthenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  //logout

  handleLogOutClick = e => {
    e.preventDefault();
    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
          <div className="container">
            <Link to="/" className="navbar-brand">
              ClientPanel
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarMain ">
              {isAuthenticated ? (
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Signup
                    </Link>
                  </li>
                </ul>
              )}

              {isAuthenticated ? (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      {auth.email}
                    </Link>
                  </li>
                  <li className="nav-item" onClick={this.handleLogOutClick}>
                    <Link to="" className="nav-link">
                      logout
                    </Link>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(withRouter(AppNavbar));
