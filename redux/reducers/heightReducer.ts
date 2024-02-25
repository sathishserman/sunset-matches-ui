import { SET_HEIGHT } from '../actionTypes';

const initialState = {
  height: 0,
};

export const heightReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_HEIGHT:
      return {
        ...state,
        height: action.payload,
      };
    default:
      return state;
  }
};