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
  allProducts: [], // ✅ Productos originales
  products: [], // ✅ Lista filtrada y ordenada
  product: {},
  loading: true,
  error: null,
  cart: [],
  searchQuery: "", // 🔎 Estado de búsqueda
  filters: { category: "All", priceRange: { min: 0, max: Infinity } }, // 🎯 Filtros
  sort: { orderBy: "name", orderDirection: "asc" }, // 🔼🔽 Ordenamiento
};

export const productReducer = (state = initialState, action) => {
  console.log("Acción recibida en productReducer:", action); // Debug

  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: action.payload.map(product => ({
          ...product,
          categories: product.Categories || [], // ✅ Evitar undefined
        })),
        products: action.payload.map(product => ({
          ...product,
          categories: product.Categories || [],
        })),
        loading: false,
      };

    case GET_PRODUCTS_FAIL:
      return { ...state, error: action.payload, loading: false };

    case PRODUCT_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_SUCCESS:
      return { ...state, product: action.payload, loading: false };

    case PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };

    // 🔎 Búsqueda + Filtrado
    case SEARCH_PRODUCTS: {
      const query = action.payload?.toLowerCase().trim() || "";
      const filtered = state.allProducts.filter((p) =>
        p.title?.toLowerCase().includes(query)
      );

      return {
        ...state,
        searchQuery: query,
        products: filtered.length ? filtered : state.allProducts, // 🔄 Mantiene productos originales si no hay coincidencias
      };
    }

    // 🎯 Filtrado por categoría y precio
    case FILTER_PRODUCTS: {
      const { category, priceRange } = action.payload;

      const filtered = state.allProducts.filter((p) => {
        const categories = p.categories || [];
        const matchesCategory = category === "All" || categories.includes(category);
        const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max;

        return matchesCategory && matchesPrice;
      });

      return {
        ...state,
        filters: action.payload, // 🔄 Guarda filtros activos
        products: filtered,
      };
    }

    // 🔼🔽 Ordenamiento
    case SORT_PRODUCTS: {
      const { orderBy, orderDirection } = action.payload;

      const sortedProducts = [...state.products].sort((a, b) => {
        if (orderBy === "price") {
          return orderDirection === "asc" ? a.price - b.price : b.price - a.price;
        } else {
          return orderDirection === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
      });

      return {
        ...state,
        sort: action.payload, // 🔄 Guarda estado del ordenamiento
        products: sortedProducts,
      };
    }

    // 🛒 Manejo del carrito
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };

    case REMOVE_FROM_CART:
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };

    case CHECKOUT:
      return { ...state, cart: [] };

    default:
      return state;
  }
};
