import { DateLocationState } from "../interfaces";
import { SET_DATE_LOCATION } from "../actionTypes";

const initialState: DateLocationState = {
  locations: [],
};

export const dateLocationReducer = (
  state = initialState,
  action: any
): DateLocationState => {
  switch (action.type) {
    case SET_DATE_LOCATION:
      return { ...state, locations: action.payload };
    default:
      return state;
  }
};
