import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { productReducer } from "./productReducer";
import { paginationReducer } from "./paginationReducer"; // ✅ Importamos el reducer de paginación
import { categoryReducer } from "./categoryReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  pagination: paginationReducer, // ✅ Ahora Redux tiene un estado de paginación
  categories:categoryReducer
});
