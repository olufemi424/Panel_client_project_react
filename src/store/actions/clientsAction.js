import * as type from "./types";

export const getAllClients = (clientId, updateAmount) => {
  return async (dispatch, getState, { getFirestore }) => {
    //make async call to db
    const fireStore = getFirestore();
    const clients = [];

    await fireStore
      .collection("clients")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          clients.push(doc.data());
        });
      })
      .then(() => {
        dispatch({ type: type.GET_ALL_CLIENTS, payload: clients });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const clientUpdateBalanceAction = (clientId, updateAmount) => {
  return (dispatch, getState, { getFirestore }) => {
    //make async call to db
    const fireStore = getFirestore();
    fireStore
      .collection("clients")
      .doc(`/${clientId}`)
      .update(updateAmount)
      .then(() => {
        dispatch({ type: type.UPDATE_BALANCE, payload: updateAmount });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const clientDeleteAction = (clientId, updateAmount) => {
  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    fireStore
      .collection("clients")
      .doc(`/${clientId}`)
      .delete()
      .then(() => dispatch({ type: type.DELETE_CLIENT }))
      .catch(err => {
        dispatch({ type: type.DELETE_CLIENT });
        console.log(err);
      });
  };
};
