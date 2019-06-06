import * as type from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case type.DISABLE_BALANCE_ON_ADD:
      return {
        ...state,
        disableBalanceOnAdd: action.payload
      };
    case type.DISABLE_BALANCE_ON_EDIT:
      return {
        ...state,
        disableBalanceOnEdit: action.payload
      };
    case type.ALLOW_REGISTRATION:
      return {
        ...state,
        allowRegistration: action.payload
      };
    default:
      return state;
  }
}
