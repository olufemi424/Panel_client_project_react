import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { getAllClients } from "../../store/actions/clientsAction";

class Clients extends Component {
  state = {
    totalOwed: null
  };

  componentDidMount() {
    this.props.getAllClients();
  }

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      // Add balances
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance);
      }, 0);
      return { totalOwed: total };
    }
    return null;
  }

  render() {
    const { totalOwed } = this.state;
    const { clients } = this.props;

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                {" "}
                <i className="fas fa-users" /> Client
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Owed{" "}
                <div className="span text-primary">${totalOwed.toFixed(2)}</div>
              </h5>
            </div>
          </div>

          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-secondary"
                    >
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  clients: PropTypes.array.isRequired,
  getAllClients: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  clients: state.clientsData.clients
});

const mapDispatchToProps = {
  getAllClients
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients);
