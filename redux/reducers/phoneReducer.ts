import { SET_PHONE_NUMBER, SET_COUNTRY_CODE } from '../actionTypes';
import { PhoneState } from '../interfaces';



const initialState: PhoneState = {
  phoneNumber: '',
  countryCode: 'US'
};

export const phoneReducer = (state = initialState, action: any): PhoneState => {
    switch (action.type) {
      case SET_PHONE_NUMBER:
        return {
          ...state,
          phoneNumber: action.payload,
        };
      case SET_COUNTRY_CODE:
        return {
          ...state,
          countryCode: action.payload,
        };
      default:
        return state;
    }
  };