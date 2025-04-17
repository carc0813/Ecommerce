import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { productReducer } from "./productReducer";
import { paginationReducer } from "./paginationReducer"; // ✅ Importamos el reducer de paginación
import { categoryReducer } from "./categoryReducer";
import {cartReducer}  from "./cartReducer";
import { paymentReducer } from "./paymentReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  pagination: paginationReducer, // ✅ Ahora Redux tiene un estado de paginación
  categories:categoryReducer,
  cart: cartReducer, // Asegúrate de que "cart" sea el key correcto
  payment:paymentReducer
});
