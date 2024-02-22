import { CONFIRM_RULES } from '../actionTypes';
import { ConfirmState } from '../interfaces';



const initialState: ConfirmState = {
  rulesConfirmed: false,
};

export const appReducer = (state = initialState, action: any): ConfirmState => {
  switch (action.type) {
    case CONFIRM_RULES:
      return {
        ...state,
        rulesConfirmed: true,
      };
    default:
      return state;
  }
};