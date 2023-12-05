export const RESET_STORE = 'RESET_STORE';
export const SET_CSV_STRING_DATA = 'SET_CSV_STRING_DATA';
export const SET_OBJ_DATA = 'SET_OBJ_DATA';

export const resetStore = () => ({
  type: RESET_STORE,
});

export const setCsvStringData = value => ({
  type: SET_CSV_STRING_DATA,
  payload: value,
});

export const setObjData = value => ({
  type: SET_OBJ_DATA,
  payload: value,
});
