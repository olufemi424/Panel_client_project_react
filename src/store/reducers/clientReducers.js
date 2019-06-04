import * as type from "../actions/types";

const initialState = {
  clients: [],
  client: {},
  balance: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case type.UPDATE_BALANCE:
      return {
        ...state,
        balance: action.payload
      };
    case type.GET_ALL_CLIENTS:
      return {
        ...state,
        clients: action.payload
      };
    default:
      return state;
  }
}
