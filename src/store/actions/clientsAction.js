import * as type from "./types";

export const addClient = (clientData, history) => {
  return (dispatch, getState, { getFirestore }) => {
    //make async call to db
    const fireStore = getFirestore();
    fireStore
      .collection("clients")
      .add(clientData)
      .then(() => {
        dispatch({ type: type.UPDATE_CLIENT_INFO, payload: clientData });
        history.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getAllClients = (params = "") => {
  return async (dispatch, getState, { getFirestore }) => {
    //make async call to db
    const fireStore = getFirestore();
    const clients = [];

    await fireStore
      .collection("clients")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.exists) {
            clients.push({ ...doc.data(), id: doc.id });
          } else {
            throw new Error("Clients not found");
          }
        });
      })
      .then(() => {
        dispatch({
          type: type.GET_ALL_CLIENTS,
          payload: clients.sort(compare)
        });
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
          dispatch({
            type: type.GET_CLIENT,
            payload: { ...doc.data(), id: doc.id }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const clientUpdateInfoAction = (clientId, updateClientData) => {
  return (dispatch, getState, { getFirestore }) => {
    //make async call to db
    const fireStore = getFirestore();
    fireStore
      .collection("clients")
      .doc(`/${clientId}`)
      .update(updateClientData)
      .then(() => {
        dispatch({ type: type.UPDATE_CLIENT_INFO, payload: updateClientData });
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

export const clientDeleteAction = clientId => {
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

export const searchClient = params => {
  return async (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    const clients = [];

    await fireStore
      .collection("clients")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.exists) {
            clients.push({ ...doc.data(), id: doc.id });
          } else {
            throw new Error("Clients not found");
          }
        });
      })
      .then(() => {
        const searchClients = clients.filter(client => {
          const regex = new RegExp(`^${params}`, "gi");
          return (
            client.lastName.match(regex) ||
            client.firstName.match(regex) ||
            client.email.match(regex)
          );
        });
        dispatch({
          type: type.SEARCH_CLIENT,
          payload: searchClients.sort(compare)
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

//helper function
const compare = (a, b) =>
  a.firstName < b.firstName ? -1 : a.firstName > b.firstName ? 1 : 0;
