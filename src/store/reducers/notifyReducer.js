import * as types from "../actions/types";

const initialState = {
  message: null,
  messageType: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.ERROR_MESSAGE:
      console.log(action.message);
      return {
        ...state,
        message: action.message,
        messageType: action.messageType
      };
    default:
      return state;
  }
}
