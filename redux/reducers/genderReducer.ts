import { SET_GENDER } from '../actionTypes';

interface GenderState {
  selectedGender: string;
}

const initialState: GenderState = {
  selectedGender: '', 
};

export const genderReducer = (state = initialState, action: any): GenderState => {
  switch (action.type) {
    case SET_GENDER:
      return {
        ...state,
        selectedGender: action.payload,
      };
    default:
      return state;
  }
};