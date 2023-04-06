import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';

// product list reducer
export const productListReducer = (state = { products: [] }, action) => {
  // state = { products: [] } is the initial state
  switch (
    action.type // action.type is the action that is dispatched
  ) {
    case PRODUCT_LIST_REQUEST: // if the action is PRODUCT_LIST_REQUEST, then return the following
      return { loading: true, products: [] }; // loading is true, products is an empty array
    case PRODUCT_LIST_SUCCESS: // if the action is PRODUCT_LIST_SUCCESS, then return the following
      return { loading: false, products: action.payload }; // loading is false, products is the payload
    case PRODUCT_LIST_FAIL: // if the action is PRODUCT_LIST_FAIL, then return the following
      return { loading: false, error: action.payload }; // loading is false, error is the payload
    default: // if the action is none of the above, then return the following
      return state; // return the state
  }
};

// product details reducer
export const productDetailsReducer = (
  state = { product: { images: [], uses: [], reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
