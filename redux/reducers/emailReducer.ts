import { SET_EMAIL, TOGGLE_SUBSCRIPTION } from '../actionTypes';
import { EmailState } from '../interfaces';

const initialState: EmailState = {
  email: '',
  subscribed: true,
};

export const emailReducer = (state = initialState, action: any): EmailState => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case TOGGLE_SUBSCRIPTION:
      return {
        ...state,
        subscribed: action.payload,
      };
    default:
      return state;
  }
};

