import { SET_VERIFICATION_CODE } from '../actionTypes';
import { VerificationState } from '../interfaces';

const initialState: VerificationState = {
  verificationCode: '',
};

export const verificationReducer = (state = initialState, action: any): VerificationState => {
  switch (action.type) {
    case SET_VERIFICATION_CODE:
      return {
        ...state,
        verificationCode: action.payload,
      };
    default:
      return state;
  }
};