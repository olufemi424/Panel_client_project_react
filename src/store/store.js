import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";

//reducers
import rootReducer from "./reducers/rootReducer";
//keys
import keys from "../config/keys";

const fbConfig = {
  apiKey: keys.apiKey,
  authDomain: keys.authDomain,
  databaseURL: keys.databaseURL,
  projectId: keys.projectId,
  storageBucket: keys.storageBucket,
  messagingSenderId: keys.messagingSenderId
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

//initialize firebase instance
firebase.initializeApp(fbConfig);
//init firestore
firebase.firestore();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//check for settings in local storage
if (localStorage.getItem("settings") == null) {
  // default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  //set to localStorage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

const initialState = {
  settings: JSON.parse(localStorage.getItem("settings"))
};

//create store
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase),
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
  )
);

export default store;
