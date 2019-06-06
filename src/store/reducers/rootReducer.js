import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import notifyReducer from "./notifyReducer";
import clientReducers from "./clientReducers";
import settingsReducer from "./settingsReducer";

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  clientsData: clientReducers,
  settings: settingsReducer
});

export default rootReducer;
