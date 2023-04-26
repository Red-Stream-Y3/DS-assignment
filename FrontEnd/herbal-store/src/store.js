import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import {
  productListReducer,
  productDetailsReducer,
  productAddReducer,
  productDeleteReducer,
  productReviewCreateReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  shipmentCreateReducer,
  orderSmsReducer,
  orderEmailReducer,
} from './reducers/orderReducers';
import { getCommissionReducer } from './reducers/adminReducers';

// Combine all reducers
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  commissionRate: getCommissionReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  shipment: shipmentCreateReducer,
  orderPay: orderPayReducer,
  orderSms: orderSmsReducer,
  orderEmail: orderEmailReducer,
  productAdd: productAddReducer,
  productDelete: productDeleteReducer,
  productReviewCreate: productReviewCreateReducer,
});

// Get cart items from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

// Get user info from local storage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingDetailsFromStorage = localStorage.getItem('shippingDetails')
  ? JSON.parse(localStorage.getItem('shippingDetails'))
  : {};

const commissionFromStorage = localStorage.getItem('commission')
  ? JSON.parse(localStorage.getItem('commission'))
  : {};

// Create initial state
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingDetails: shippingDetailsFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  commissionRate: { commission: commissionFromStorage },
};

// Create middleware array
const middleware = [thunk];

// Create store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
