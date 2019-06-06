import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOutUser } from "../../store/actions/authAction";

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
    this.props.logOutUser();
  };

  render() {
    const { isAuthenticated } = this.state;
    const {
      auth,
      settings: { allowRegistration }
    } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
          <Link className="navbar-brand" to="/">
            CIMS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {isAuthenticated ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
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
                {allowRegistration ? (
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                ) : null}
              </ul>
            )}

            {isAuthenticated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#!" className="nav-link">
                    {auth.email}
                  </a>
                </li>
                <li className="nav-item">
                  <Link to="/settings" className="nav-link">
                    Settings
                  </Link>
                </li>
                <li className="nav-item" onClick={this.handleLogOutClick}>
                  <Link to="" className="nav-link">
                    Logout
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </nav>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  settings: state.settings
});
const mapDispatchToProps = {
  logOutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppNavbar));
