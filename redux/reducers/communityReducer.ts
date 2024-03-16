import { CommunityState } from "../interfaces";
import { SET_COMMUNITIES } from "../actionTypes";

const initialState: CommunityState = {
  communities: [],
};

export const communityReducer = (
  state = initialState,
  action: any
): CommunityState => {
  switch (action.type) {
    case SET_COMMUNITIES:
      return { ...state, communities: action.payload };
    default:
      return state;
  }
};
