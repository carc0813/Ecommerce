
import { GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL } from "../actions";

const initialState = {
  products: [],
  loading: true,
  error: null,
};

export const productReducer = (state = initialState, action) => {
  console.log("Acción recibida en productReducer:", action); // Debug
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
