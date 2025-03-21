import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT,
} from "../actions";

const initialState = {
  products: [],  // Lista de productos
  product: null, // Producto individual
  loading: true,
  error: null,
  cart: [],
};

// Reducer para los productos
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
    case PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_SUCCESS:
      return {
        ...state, // ✅ Mantiene los datos previos
        product: action.payload, // ✅ Guarda el producto individual
        loading: false,
      };
    case PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case CHECKOUT:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

