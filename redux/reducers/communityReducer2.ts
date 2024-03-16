import { SET_COMMUNITIES, SET_USER_SELECTIONS } from "../actionTypes";

const initialState = {
  communities: [],
  userSelections: [],
};

export const communityReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_COMMUNITIES:
      return { ...state, communities: action.payload };
    case SET_USER_SELECTIONS:
      return { ...state, userSelections: action.payload };
    default:
      return state;
  }
};
