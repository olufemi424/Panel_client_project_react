import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

//reducers
import notifyReducer from "./reducers/notifyReducer";

const firebaseConfig = {
  apiKey: "AIzaSyBWaK7ubkxt5NTfVsfjCFbiTetWsyReXiw",
  authDomain: "clientpanel-401d0.firebaseapp.com",
  databaseURL: "https://clientpanel-401d0.firebaseio.com",
  projectId: "clientpanel-401d0",
  storageBucket: "clientpanel-401d0.appspot.com",
  messagingSenderId: "794313968648"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

//initialize firebase instance
firebase.initializeApp(firebaseConfig);

//init firestore
firebase.firestore();

// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer
});

// Create store with reducers and initial state
const initialState = {};

//create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
