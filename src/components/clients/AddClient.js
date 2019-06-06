import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addClient } from "../../store/actions/clientsAction";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    balance: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newClient = this.state;
    const { history } = this.props;
    //if no balance. make 0
    if (newClient.balance === "") {
      newClient.balance = 0;
    }
    //add to firestore
    this.props.addClient(newClient, history);
  };

  render() {
    const { disableBalanceOnAdd } = this.props.settings;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left"> Back To Dashboard</i>
            </Link>
          </div>
        </div>
        <div className="card-header">Add Client</div>
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.firstName}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.lastName}
                required
              />

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  minLength="10"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.phone}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Address</label>
                <input
                  type="text"
                  name="address"
                  minLength="10"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.address}
                />
              </div>

              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  name="balance"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.balance}
                  disabled={disableBalanceOnAdd}
                />
              </div>
            </div>

            <input
              type="submit"
              value="Submit"
              className="btn btn-primary btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

AddClient.protoType = {
  settings: PropTypes.object.isRequired,
  addClient: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { addClient }
)(AddClient);
