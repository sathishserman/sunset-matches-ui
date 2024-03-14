import { DateThemeState } from "../interfaces";
import { SET_DATE_THEME } from "../actionTypes";

const initialState: DateThemeState = {
  themes: [],
};

export const dateThemeReducer = (
  state = initialState,
  action: any
): DateThemeState => {
  switch (action.type) {
    case SET_DATE_THEME:
      return { ...state, themes: action.payload };
    default:
      return state;
  }
};
