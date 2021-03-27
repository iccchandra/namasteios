import * as actionTypes from '../actions/actionTypes';
import {THEMES} from '../themes/themes';

const initialAuthState = {loading: false, user: null, theme: THEMES[1], contactData: []};

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_CALL_MADE:
      return {
        ...state,
        loading: true
      }
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case actionTypes.API_START:
      if (action.payload === actionTypes.LOGIN_CALL_MADE) {
        return {
          ...state,
          loading: true
        };
      }
    case actionTypes.API_END:
      if (action.payload === actionTypes.LOGIN_CALL_MADE) {
        return {
          ...state,
          loading: false
        };
      }
    // case LOGIN:
    //   return {...state, user: action.payload, loading: false};

    // case LOGOUT:
    //   return {...state, user: null, loading: false};

    case actionTypes.THEME:
      return {...state, theme: action.payload};

    // case CONTACT:
    //   return {...state, contactData: action.payload};

    default:
      return state;
  }
}

export default auth;
