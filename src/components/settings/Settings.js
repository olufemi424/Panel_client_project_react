import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
  setAllowRegistration
} from "../../store/actions/settingsActions";

export class Settings extends Component {
  disableBalanceOnAddChange = () => {
    this.props.setDisableBalanceOnAdd();
  };
  disableBalanceOnEditChange = () => {
    this.props.setDisableBalanceOnEdit();
  };
  allowRegistrationChange = () => {
    this.props.setAllowRegistration();
  };
  render() {
    const {
      allowRegistration,
      disableBalanceOnAdd,
      disableBalanceOnEdit
    } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/dashboard" className="btn btn-link">
              <div className="fas fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Edit Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registration</label>{" "}
                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={!!allowRegistration}
                  onChange={this.allowRegistrationChange}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance On Add</label>{" "}
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  checked={!!disableBalanceOnAdd}
                  onChange={this.disableBalanceOnAddChange}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance On Add</label>{" "}
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  checked={!!disableBalanceOnEdit}
                  onChange={this.disableBalanceOnEditChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  settings: state.settings
});

const mapDispatchToProps = {
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
  setAllowRegistration
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
