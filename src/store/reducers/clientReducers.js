import * as type from "../actions/types";

const initialState = {
  clients: [],
  client: {},
  balance: null
};

export default function(state = initialState, action) {
  if (state.client.balance) {
    state.balance = state.client.balance;
  }
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
    case type.GET_CLIENT:
      return {
        ...state,
        client: action.payload
      };
    default:
      return state;
  }
}
