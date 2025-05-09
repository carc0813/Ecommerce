// redux/reducers/authReducer.js
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET_AUTH_STATE,
  } from "../actions";
  
  const initialState = {
    token: localStorage.getItem("Token"),//traemos el token al statte global
    isAuthenticated: !!localStorage.getItem("Token"), // Verifica si hay token
    user: null,
    error: null,
    loading: true,
  };
  //reducer solo para autenticaciion y registro 
  export const authReducer = (state = initialState, action) => {
    console.log("Acción recibida en authReducer:", action); // Debug
    switch (action.type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isAuthenticated: false,
          user: action.payload,
          error: null,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isAuthenticated: false,
          error: action.payload,
          loading: false,
        };
      case LOGIN_SUCCESS:
        localStorage.setItem("Token", action.payload.token); // Guarda el token
        return {
          ...state,
          token: action.payload.token,
          isAuthenticated: true,
          user: action.payload.user,
          error: null,
          loading: false,
        };
  
      case LOGIN_FAIL:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
      case LOGOUT:
        localStorage.removeItem("Token");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          user: null,
          error: action.payload,
          loading: false,
        };
      case RESET_AUTH_STATE:
        return initialState; // Reinicia el estado al original
      default:
        return state;
    }
  };
  