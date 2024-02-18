import { SET_NAME } from '../actionTypes';
import { NameState } from '../interfaces';
import {setName} from '../actions';

const initialState:NameState = {
  name: '',
};

export const nameReducer = (state = initialState, action: ReturnType<typeof setName>): NameState => {
    switch (action.type) {
      case SET_NAME:
        return {
          ...state,
          name: action.payload,
        };
      default:
        return state;
    }
  };