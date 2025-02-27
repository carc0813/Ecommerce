// redux/store.js
import { createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk"; // Se corrigió el import sin destructuring
import { rootReducer } from "./reducers/rootReducer"; // Importa el reducer combinado

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;