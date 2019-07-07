import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import ClientTable from "./ClientTable";
import { getAllClients, searchClient } from "../../store/actions/clientsAction";

class Clients extends Component {
  state = {
    totalOwed: null,
    searchParama: ""
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

  handleClick = e => {
    e.preventDefault();
    this.props.searchClient(e.target.value);
  };

  handleChange = e => {
    e.preventDefault();
    this.props.searchClient(e.target.value);
  };

  render() {
    const { totalOwed } = this.state;
    const { clients } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2>
              {" "}
              <i className="fas fa-users" /> Client
            </h2>
            <form className="form-inline my-3">
              <input
                className="form-control mr-sm-2"
                type="search"
                name="searchParama"
                placeholder="Search"
                onChange={this.handleChange}
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={this.handleClick}
              >
                Search
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <h5 className="text-right text-secondary">
              Total Owed{" "}
              <div className="span text-primary">${totalOwed.toFixed(2)}</div>
            </h5>
          </div>
        </div>
        {clients.length > 0 ? <ClientTable clients={clients} /> : <Spinner />}
      </div>
    );
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
  getAllClients,
  searchClient
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients);
