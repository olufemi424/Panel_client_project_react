import * as types from "./types";

export const createUser = userData => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    await firebase.auth();
    firebase
      .createUser(userData)
      .then(() => {
        dispatch({ type: types.REGISTER_SUCCESS });
      })
      .catch(err => {
        dispatch({
          type: types.ERROR_MESSAGE,
          message: "User Alredy Exits",
          messageType: "error"
        });
      });
  };
};

export const loginUser = userData => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    await firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then(() => {
        dispatch({ type: types.LOGIN_SUCCESS });
      })
      .catch(err => {
        dispatch({
          type: types.ERROR_MESSAGE,
          message: "Invalid Login Credentials",
          messageType: "error"
        });
      });
  };
};

export const logOutUser = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    await firebase.logout().then(() => {
      dispatch({ type: "SIGNED_OUT_SUCCESS" });
    });
  };
};
