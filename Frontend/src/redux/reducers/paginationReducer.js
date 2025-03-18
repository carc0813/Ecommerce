import { SET_PAGE } from "../actions";

const initialState = {
  currentPage: 1,
  productsPerPage: 12,
};

export const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};
