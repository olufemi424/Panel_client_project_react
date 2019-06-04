import * as type from "../actions/types";

const initialState = {
  clients: [],
  client: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case type.UPDATE_BALANCE:
      return {
        ...state,
        client: { ...state.client, balance: action.payload }
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
