import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../actions";

const initialState = {
  cartItems: [],
  totalAmount: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      
    const existingItem = state.cartItems.find(item => item.id === action.payload.id);

      let updatedCart;
      if (existingItem) {
        updatedCart = state.cartItems.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...state.cartItems, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        cartItems: updatedCart,
        totalAmount: updatedCart.reduce((total, item) => total + item.price * item.quantity, 0),
      };

    case REMOVE_FROM_CART:
      const filteredCart = state.cartItems.filter(item => item.id !== action.payload);
      return {
        ...state,
        cartItems: filteredCart,
        totalAmount: filteredCart.reduce((total, item) => total + item.price * item.quantity, 0),
      };

    case CLEAR_CART:
      return {
        cartItems: [],
        totalAmount: 0,
      };

    default:
      return state;
  }
};

