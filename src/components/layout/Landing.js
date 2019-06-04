import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Landing extends Component {
  render() {
    //  console.log(this.props.auth);
    return (
      <div className="jumbotron">
        <h1 className="display-4">
          Welcome to Clients Information Management System
        </h1>
        <p className="lead">
          This is a web Application for management of Shopwise Ventures Inc
          clients Information
        </p>
        <hr className="my-4" />
        <p>
          Pls login to procceed to the dashboard. login with email:
          admin@email.com and password: 123456
        </p>
        <Link className="btn btn-primary btn-lg" to="/dashboard" role="button">
          Login
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth.uid
  };
};

export default connect(mapStateToProps)(Landing);
