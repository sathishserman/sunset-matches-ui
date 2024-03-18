import { SET_BIO } from "../actionTypes";
import { BioState } from "../interfaces";
import { setBio } from "../actions";

const initialState: BioState = {
  bio: "",
};

export const bioReducer = (
  state = initialState,
  action: ReturnType<typeof setBio>
): BioState => {
  switch (action.type) {
    case SET_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    default:
      return state;
  }
};
