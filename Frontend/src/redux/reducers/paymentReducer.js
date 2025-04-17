import {
  CREATE_PAYMENT_INTENT_REQUEST,
  CREATE_PAYMENT_INTENT_SUCCESS,
  CREATE_PAYMENT_INTENT_FAIL,
  PROCESS_PURCHASE_REQUEST,
  PROCESS_PURCHASE_SUCCESS,
  PROCESS_PURCHASE_FAIL,
} from "../actions";

const initialState = {
  loading: false,
  clientSecret: null,
  purchaseData: null,
  error: null,
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAYMENT_INTENT_REQUEST:
    case PROCESS_PURCHASE_REQUEST:
      return { ...state, loading: true };

    case CREATE_PAYMENT_INTENT_SUCCESS:
      return { ...state, loading: false, clientSecret: action.payload };

    case PROCESS_PURCHASE_SUCCESS:
      return { ...state, loading: false, purchaseData: action.payload };

    case CREATE_PAYMENT_INTENT_FAIL:
    case PROCESS_PURCHASE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
