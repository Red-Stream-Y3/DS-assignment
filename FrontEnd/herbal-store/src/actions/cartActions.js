import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_DETAILS,
} from '../constants/cartConstants';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:9121/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.images[0].url,
      price: data.price,
      countInStock: data.countInStock,
      quantity,
      shop: data.shop,
      seller: data.user,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingDetails = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_DETAILS,
    payload: data,
  });

  localStorage.setItem('shippingDetails', JSON.stringify(data));
};
