import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import classnames from "classnames";
import {
  clientUpdateBalanceAction,
  clientDeleteAction,
  getClientInfo
} from "../../store/actions/clientsAction";

class ClientsDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: null
  };

  componentDidMount() {
    this.props.getClientInfo(this.props.match.params.id);
  }

  //HANDLE STATE CHANGE
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Toggle Edit balance
  toggleEditBalance = () => {
    const { client } = this.props;
    this.setState({
      showBalanceUpdate: !this.state.showBalanceUpdate,
      balanceUpdateAmount: parseFloat(client.balance).toFixed(2)
    });
  };

  //HANDLE BALANCE UPDATE
  handleSubmit = e => {
    e.preventDefault();

    const { id } = this.props.match.params;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: balanceUpdateAmount
    };

    if (isNaN(clientUpdate.balance) || clientUpdate.balance === "") {
      alert("Pls Enter a Number");
    } else {
      this.props.clientUpdateBalanceAction(id, clientUpdate);
      //  close form
      this.setState({
        showBalanceUpdate: false
      });
    }
  };

  //DELETE CLIENT
  onDeleteClient = () => {
    const { id, history } = this.props;
    if (window.confirm("Are you sure you want to delete Client ?")) {
      this.props.clientDeleteAction(id);
      history.push("/dashboard");
    }
  };

  render() {
    const { client } = this.props;
    const { id } = this.props.match.params;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;
    let balanceForm = "";
    //if balance form should display
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="balanceUpdateAmount"
              placeholder="Add New Balance"
              value={balanceUpdateAmount}
              onChange={this.handleChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (Object.entries(client).length !== 0) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/dashboard" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={this.onDeleteClient}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID: <span className="text-secondary">{id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Balance:{" "}
                    <span
                      className={classnames({
                        "text-danger": client.balance < 100,
                        "text-success": client.balance >= 100
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>
                    <span>
                      <a href="#!" onClick={this.toggleEditBalance}>
                        {" "}
                        <i className="fas fa-pencil-alt small" />
                      </a>
                    </span>
                  </h3>
                  {balanceForm}
                </div>
              </div>
              <ul className="list-group">
                {client.email && (
                  <li className="list-group-item">Email: {client.email}</li>
                )}
                {client.phone && (
                  <li className="list-group-item">Phone: {client.phone}</li>
                )}
                {client.address && (
                  <li className="list-group-item">Address: {client.address}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

ClientsDetails.propTypes = {
  client: PropTypes.object.isRequired,
  clientUpdateBalanceAction: PropTypes.func.isRequired,
  clientDeleteAction: PropTypes.func.isRequired,
  getClientInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  client: state.clientsData.client
});

const mapDispatchToProps = {
  clientUpdateBalanceAction,
  clientDeleteAction,
  getClientInfo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientsDetails);
