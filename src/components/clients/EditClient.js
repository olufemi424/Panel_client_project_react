import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {
  getClientInfo,
  clientUpdateInfoAction
} from "../../store/actions/clientsAction";

class EditClient extends Component {
  constructor(props) {
    super(props);
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.address = React.createRef();
    this.balanceInput = React.createRef();
  }

  componentDidMount() {
    this.props.getClientInfo(this.props.match.params.id);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    //update client
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      address: this.address.current.value,
      balance:
        this.balanceInput.current.value === ""
          ? 0
          : this.balanceInput.current.value
    };

    this.props.clientUpdateInfoAction(id, updClient);
    this.props.history.push(`/client/${id}`);
  };

  render() {
    const {
      client,
      settings: { disableBalanceOnEdit }
    } = this.props;

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/dashboard" className="btn btn-link">
                <i className="fas fa-arrow-circle-left"> Back To Dashboard</i>
              </Link>
            </div>
          </div>
          <div className="card-header">Edit Client</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  onChange={this.handleChange}
                  defaultValue={client.firstName}
                  ref={this.firstNameInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  onChange={this.handleChange}
                  defaultValue={client.lastName}
                  ref={this.lastNameInput}
                  required
                />

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={this.handleChange}
                    defaultValue={client.email}
                    ref={this.emailInput}
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
                    defaultValue={client.phone}
                    ref={this.phoneInput}
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
                    defaultValue={client.address}
                    ref={this.address}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="text"
                    name="balance"
                    className="form-control"
                    onChange={this.handleChange}
                    defaultValue={client.balance}
                    ref={this.balanceInput}
                    disabled={disableBalanceOnEdit}
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
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  client: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  client: state.clientsData.client,
  settings: state.settings
});

const mapDispatchToProps = {
  getClientInfo,
  clientUpdateInfoAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClient);
