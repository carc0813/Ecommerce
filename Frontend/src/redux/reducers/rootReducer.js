
import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { productReducer } from "./productReducer";
//combina los reducer para mejor control y manejo de las peticiones 
export const rootReducer = combineReducers({
  auth: authReducer, // Reducer de autenticación
  products: productReducer, // Reducer de productos
});
