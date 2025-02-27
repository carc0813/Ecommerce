
import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { productReducer } from "./productReducer";

export const rootReducer = combineReducers({
  auth: authReducer, // Reducer de autenticación
  products: productReducer, // Reducer de productos
});
