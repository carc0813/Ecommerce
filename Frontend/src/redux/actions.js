import axios from "axios";
import {jwtDecode} from "jwt-decode"; // 📌 Instala con: npm install jwt-decode
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAIL = "GET_PRODUCTS_FAIL";
export const  RESET_AUTH_STATE="RESET_AUTH_STATE";


//action que sirve para registrarme en la base de datos
export const register = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/users/register",
      userData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Para permitir autenticación basada en cookies si es necesario
      }
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });

    return response; // Retornar la respuesta para manejarla en el frontend
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error en el registro";
    const errorStatus = error.response?.status || 500;

    dispatch({
      type: REGISTER_FAIL,
      payload: { message: errorMessage, status: errorStatus },
    });

    return Promise.reject(error);
  }
};



//action para logueo despues de registrarme y ingresar ala pagina
export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:3001/users/login", { email, password });

    console.log("Respuesta del servidor:", res.data); // 🔎 Verifica qué envía el backend

    const token = res.data.token;
    const userData = jwtDecode(token); // ✅ Decodificar el usuario del token

    console.log("Usuario extraído del token:", userData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token,
        user: userData, // ✅ Guardamos el usuario
      },
    });
    //enviamos el usuario ala localstorage para seguir trabajando con el en futuras sesiones 
    localStorage.setItem("token", token);
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);

    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || "Error al iniciar sesión",
    });
  }
};

//action para cerrar sesiion
export const logout = () => (dispatch) => {
  localStorage.removeItem("Token");
  dispatch({
    type: LOGOUT,
  });
};
// Reinicia el estado al original
export const resetAuthState = () => ({
  type: RESET_AUTH_STATE,
});
//traerme todos los productos de la base de datos 
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3001/products");
    console.log("Productos recibidos:", res.data); // Debugging
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
