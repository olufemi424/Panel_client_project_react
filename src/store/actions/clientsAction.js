import * as type from "./types";

export const getAllClients = () => {
  return async (dispatch, getState, { getFirestore }) => {
    //make async call to db
    const fireStore = getFirestore();
    const clients = [];

    await fireStore
      .collection("clients")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          clients.push({ ...doc.data(), id: doc.id });
        });
      })
      .then(() => {
        console.log(clients);
        dispatch({ type: type.GET_ALL_CLIENTS, payload: clients });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getClientInfo = clientId => {
  return async (dispatch, getState, { getFirestore }) => {
    //make async call to db
    const fireStore = getFirestore();
    await fireStore
      .collection("clients")
      .doc(`/${clientId}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          dispatch({ type: type.GET_CLIENT, payload: doc.data() });
        }
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
        dispatch({ type: type.UPDATE_BALANCE, payload: updateAmount.balance });
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
