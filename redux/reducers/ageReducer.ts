import { SET_AGE } from "../actionTypes";

const initialState = {
  age: 0,
};

export const ageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_AGE:
      return {
        ...state,
        age: action.payload,
      };
    default:
      return state;
  }
};
