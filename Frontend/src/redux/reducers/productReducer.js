import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT,
  SEARCH_PRODUCTS,
  FILTER_PRODUCTS,
  SORT_PRODUCTS,
} from "../actions";

const initialState = {
  allProducts: [], // ✅ Lista completa (no modificada)
  products: [], // ✅ Lista filtrada y ordenada
  product: {},
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
    allProducts: action.payload.map(product => ({
      ...product,
      categories: product.Categories ? product.Categories : [], // ✅ Evitar undefined
    })),
    products: action.payload.map(product => ({
      ...product,
      categories: product.Categories ? product.Categories : [], // ✅ Evitar undefined
    })),
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
     // 🔎 Búsqueda por nombre
    case SEARCH_PRODUCTS:
      return {
        ...state,
        products: state.allProducts.filter((p) =>
          p.title.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };

    // 🎯 Filtrado por categoría y precio
    case FILTER_PRODUCTS:
      console.log("Ejemplo de producto antes del filtrado:", state.allProducts[0]);
    
      return {
        ...state,
        products: state.allProducts.filter((p) => {
          const categories = p.categories || []; // ✅ Asegurar array vacío si falta
          const matchesCategory =
            action.payload.category === "All" || 
            categories.includes(action.payload.category); // ✅ Ahora funciona bien
    
          const matchesPrice =
            p.price >= action.payload.priceRange.min &&
            p.price <= action.payload.priceRange.max;
    
          return matchesCategory && matchesPrice;
        }),
      };
    
    // 🔼🔽 Ordenamiento por precio o nombre
    case SORT_PRODUCTS:
      return {
        ...state,
        products: [...state.products].sort((a, b) => {
          if (action.payload.orderBy === "price") {
            return action.payload.orderDirection === "asc" ? a.price - b.price : b.price - a.price;
          } else {
            return action.payload.orderDirection === "asc"
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title);
          }
        }),
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

