import { SET_AGE} from '../actionTypes';
import { AgeState } from '../interfaces';



const initialState: AgeState = {
  age: null,
};

export const ageReducer = (state = initialState, action: any): AgeState => {
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