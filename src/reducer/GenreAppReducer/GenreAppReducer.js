import { ACTION_TYPES } from "./action"

export const INITIAL_STATE = {
    totalIndex: 0,
    appPerPage: 5,
    currentPage: 0,
    payload: {},
    error: false,
}

export function GenreAppReducer(state, action){
    switch (action.type) {
      case ACTION_TYPES.UPDATE_PAGE:
        return {
          ...state,
          currentPage: action.currentPage,
        };
      case ACTION_TYPES.FECTH_START:
        return {
          ...state,
          error: false,
        };
      case ACTION_TYPES.FECTH_SUCCESS:
        return {
          ...state,
          payload: action.payload,         
          error: false,
        };
      case ACTION_TYPES.ERROR:
        return {
          ...state,
          error: true,
        };
      default:
        return state;
    }
};