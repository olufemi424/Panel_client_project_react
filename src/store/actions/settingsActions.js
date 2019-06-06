import * as types from "./types";

export const setDisableBalanceOnAdd = () => dispatch => {
  //get settings from localstorage
  const settings = JSON.parse(localStorage.getItem("settings"));
  //toggle
  settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

  //set back to local storage
  localStorage.setItem("settings", JSON.stringify(settings));
  dispatch({
    type: types.DISABLE_BALANCE_ON_ADD,
    payload: settings.disableBalanceOnAdd
  });
};

export const setDisableBalanceOnEdit = () => dispatch => {
  //get settings from localstorage
  const settings = JSON.parse(localStorage.getItem("settings"));
  //toggle
  settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;

  //set back to local storage
  localStorage.setItem("settings", JSON.stringify(settings));
  dispatch({
    type: types.DISABLE_BALANCE_ON_EDIT,
    payload: settings.disableBalanceOnEdit
  });
};

export const setAllowRegistration = () => dispatch => {
  //get settings from localstorage
  const settings = JSON.parse(localStorage.getItem("settings"));
  //toggle
  settings.allowRegistration = !settings.allowRegistration;

  //set back to local storage
  localStorage.setItem("settings", JSON.stringify(settings));
  dispatch({
    type: types.ALLOW_REGISTRATION,
    payload: settings.allowRegistration
  });
};
