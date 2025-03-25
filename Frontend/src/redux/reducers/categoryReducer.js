import { GET_CATEGORIES_SUCCESS, GET_CATEGORIES_ERROR } from "../actions";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload || [] , loading: false } ;
    case GET_CATEGORIES_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
