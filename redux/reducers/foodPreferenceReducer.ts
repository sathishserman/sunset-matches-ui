import { FoodPreferenceState } from "../interfaces";
import { SET_FOOD_PREFERENCE } from "../actionTypes";

const initialState: FoodPreferenceState = {
  foodPreference: [],
};

export const foodPreferencesReducer = (
  state = initialState,
  action: any
): FoodPreferenceState => {
  switch (action.type) {
    case SET_FOOD_PREFERENCE:
      return { ...state, foodPreference: action.payload };
    default:
      return state;
  }
};
