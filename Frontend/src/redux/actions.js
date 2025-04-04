import axios from "axios";
import { jwtDecode } from "jwt-decode"; // 📌 Instala con: npm install jwt-decode
import { toast } from "react-toastify";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAIL = "GET_PRODUCTS_FAIL";
export const PRODUCT_REQUEST = "PRODUCT_REQUEST";
export const PRODUCT_SUCCESS = "PRODUCT_SUCCESS";
export const PRODUCT_FAIL = "PRODUCT_FAIL";
export const RESET_AUTH_STATE = "RESET_AUTH_STATE";
export const SET_PAGE = "SET_PAGE";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART="CLEAR_CART";
export const CHECKOUT = "CHECKOUT";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const SORT_PRODUCTS = "SORT_PRODUCTS";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_ERROR = "GET_CATEGORIES_ERROR";
export const UPDATE_CART_QUANTITY="UPDATE_CART_QUANTITY";


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
    const res = await axios.post("http://localhost:3001/users/login", {
      email,
      password,
    });

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
  localStorage.removeItem("token");
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

//traerme todas las categorias de la base de datos
export const getCategories = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3001/categories"); // Ajusta la URL según tu backend
    const data = await response.json();
    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CATEGORIES_ERROR, payload: error.message });
  }
};

//traerme el producto de la base de datos
export const getProductById = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT_REQUEST });

  try {
    const response = await axios.get(`http://localhost:3001/products/${id}`);
    const data = response.data; // ✅ Aquí está la respuesta correcta
    console.log("Producto obtenido:", data);

    dispatch({ type: PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error al obtener producto:", error);
    dispatch({
      type: PRODUCT_FAIL,
      payload: error.response?.data?.message || "Error al obtener el producto",
    });
  }
};

//paginacion
export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});


//chequeo de base de datos
export const checkout = () => ({
  type: CHECKOUT,
});

// Búsqueda por nombre
export const searchProducts = (query) => ({
  type: SEARCH_PRODUCTS,
  payload: query,
});

// Filtrado por categoría y precio
export const filterProducts = (category, priceRange) => ({
  type: FILTER_PRODUCTS,
  payload: { category, priceRange },
});

// Ordenamiento por precio o nombre
export const sortProducts = (orderBy, orderDirection) => ({
  type: SORT_PRODUCTS,
  payload: { orderBy, orderDirection },
});

//agregar carrito
export const addToCart = (product) => (dispatch, getState) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: product,
  });

  toast.success(`${product.title} agregado al carrito!`, {
    position: "top-right",
    autoClose: 2000,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

//eliminar carrito
export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: productId,
  });

  toast.warn("Producto eliminado del carrito", {
    position: "top-right",
    autoClose: 2000,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

//actualizar el carrito de compras 
export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART});

  toast.info("Carrito vaciado", {
    position: "top-right",
    autoClose: 2000,
  });

  localStorage.removeItem("cart");
};


export const processPurchase = () => async (dispatch, getState) => {
  try {
    const { cartItems } = getState().cart;

    await axios.post("http://localhost:3001/orders", { cartItems });

    dispatch(clearCart());

    toast.success("Compra realizada con éxito!", {
      position: "top-right",
      autoClose: 3000,
    });
  } catch (error) {
    toast.error("Error en la compra", {
      position: "top-right",
      autoClose: 3000,
    });
  }
};

// Acción para actualizar la cantidad de productos en el carrito
export const updateCartQuantity = (itemId, quantity) => (dispatch) => {
  dispatch({ type: UPDATE_CART_QUANTITY, payload: { itemId, quantity } });
};