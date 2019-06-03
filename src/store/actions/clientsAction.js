export const clientUpdateBalanceAction = (clientId, updateAmount) => {
  return (dispatch, getState, { getFirestore }) => {
    //make async call to db
    const fireStore = getFirestore();
    fireStore
      .collection("clients")
      .doc(`/${clientId}`)
      .update(updateAmount)
      .then(() => console.log("done"));
  };
};

export const clientDeleteAction = (clientId, updateAmount) => {
  return (dispatch, getState, { getFirestore }) => {
    //make async call to db
    const fireStore = getFirestore();
    fireStore
      .collection("clients")
      .doc(`/${clientId}`)
      .delete()
      .then(() => console.log("done delete"));
  };
};
