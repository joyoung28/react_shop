import {
  AUTH_USER,
  LOGIN_USER,
  REGISTER_USER,
  ADD_TO_CART,
  LOGOUT_USER,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;

    case REGISTER_USER:
      return { ...state, register: action.payload };
      break;

    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;

    case LOGOUT_USER:
      return { ...state };
      break;

    case ADD_TO_CART:
      return {
        ...state,
        userData: { ...state.userData, cart: action.payload },
      };
      break;

    default:
      return state;
  }
}
