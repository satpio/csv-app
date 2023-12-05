import { SET_CSV_STRING_DATA, SET_OBJ_DATA, RESET_STORE } from './Actions.js';

const INITIAL_STATE = {
  objData: {},
  csvStringData: '',
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_STORE:
      return {
        ...INITIAL_STATE,
      };
    case SET_CSV_STRING_DATA:
      return {
        ...state,
        csvStringData: action.payload,
      };
    case SET_OBJ_DATA:
      return {
        ...state,
        objData: action.payload,
      };
    default:
      return state;
  }
};
