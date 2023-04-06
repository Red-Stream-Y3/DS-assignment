import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/productConstants';

// product list action
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST }); // dispatching the action

    const { data } = await axios.get('http://localhost:5001/api/products'); // fetching the data from the backend

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data }); // dispatching the action
  } catch (error) {
    dispatch({
      // dispatching the action
      type: PRODUCT_LIST_FAIL,
      // if error.response.data.message exists, then use it, otherwise use error.message
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
