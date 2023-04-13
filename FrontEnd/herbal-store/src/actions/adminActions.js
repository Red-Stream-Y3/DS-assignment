import axios from 'axios';
import {
  COMMISSION_DETAILS_REQUEST,
  COMMISSION_DETAILS_SUCCESS,
  COMMISSION_DETAILS_FAIL,
  COMMISSION_DETAILS_RESET,
} from '../constants/adminConstants';
import { logout } from './userActions';

export const getCommissionDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMMISSION_DETAILS_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // };

    const { data } = await axios.get(`http://localhost:9122/v1/commission`);

    // const { data } = await axios.get(`http://localhost:9122/v1/commission`);

    dispatch({
      type: COMMISSION_DETAILS_SUCCESS,
      payload: data,
    });

    localStorage.setItem('commission', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: COMMISSION_DETAILS_FAIL,
      payload: message,
    });
  }
};
