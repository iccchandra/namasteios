import * as actionTypes from '../actions/actionTypes';

const initialAuthState = {
  contactList: [],
};

const contact = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CONTACT:
        return {
            ...state,
            contactList: action.payload
        };
    case actionTypes.CONTACT_UPLOAD:
        return state
            
    default:
      return state;
  }
}

export default contact;
