import * as actionTypes from '../actions/actionTypes';
import {THEMES} from '../themes/themes';

const initialAuthState = {
  loading: false,
  user: null,
  theme: THEMES[1],
  contactData: [],
  phoneNumber: null,
  validatePhomeNumber: false
};


const auth = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.ENTER_NUMBER:
      return {
        ...state,
        phoneNumber: action.phoneNumber,
        validatePhomeNumber: action.phoneNumber.length === 10
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        data: action.payload.commandResult,
      };
      
    case actionTypes.API_START:
      if (action.payload === actionTypes.VERIFY_OTP_REQUEST) {
        return {
          ...state,
          loading: true
        };
      }

    case actionTypes.API_END:
      if (action.payload === actionTypes.VERIFY_OTP_REQUEST) {
        return {
          ...state,
          loading: false
        };
      }

    case actionTypes.VERIFY_OTP:
        return {
          ...state,
          user: action.payload
        }

    case actionTypes.THEME:
      return {...state, theme: action.payload};

    default:
      return state;
  }
}

export default auth;
