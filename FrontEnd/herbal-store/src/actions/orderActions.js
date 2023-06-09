import axios from 'axios';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  SHIPMENT_CREATE_REQUEST,
  SHIPMENT_CREATE_SUCCESS,
  SHIPMENT_CREATE_FAIL,
  ORDER_SMS_REQUEST,
  ORDER_SMS_SUCCESS,
  ORDER_SMS_FAIL,
  ORDER_EMAIL_REQUEST,
  ORDER_EMAIL_SUCCESS,
  ORDER_EMAIL_FAIL,
  ORDER_DETAILS_BY_USER_ID_REQUEST,
  ORDER_DETAILS_BY_USER_ID_SUCCESS,
  ORDER_DETAILS_BY_USER_ID_FAIL,
} from '../constants/orderConstants';
import { logout } from './userActions';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:9124/api/orders`,
      order,
      config
    );

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });
    localStorage.removeItem('cartItems');
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:9124/api/orders/${id}`,
      config
    );

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const createShipment = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SHIPMENT_CREATE_REQUEST });

    const {
      cart: { shippingDetails },
    } = getState();

    const { data: SHIPPO_API_KEY } = await axios.get(
      'http://localhost:9124/api/config/shippo'
    );

    const shippoAddressFrom = {
      name: 'Red Stream',
      street1: '215 Clayton St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94117',
      country: 'US',
      phone: '+1 555 341 9393',
      email: 'admin@redstream.com',
    };

    const shippoAddressTo = {
      name: shippingDetails.firstName + ' ' + shippingDetails.lastName,
      company: 'Red Stream',
      street1: shippingDetails.address,
      city: shippingDetails.city,
      state: shippingDetails.state,
      zip: shippingDetails.postalCode,
      country: shippingDetails.country,
      phone: shippingDetails.phone,
      email: 'user@redstream.com',
    };

    const shippoParcel = {
      length: '20',
      width: '10',
      height: '6',
      distance_unit: 'in',
      weight: '2',
      mass_unit: 'lb',
    };

    const shipmentData = {
      address_from: shippoAddressFrom,
      address_to: shippoAddressTo,
      parcels: [shippoParcel],
      provider: 'shippo',
      extra: {
        servicelevel_token: 'shippo_priority',
      },
    };

    const config = {
      headers: {
        Authorization: `ShippoToken ${SHIPPO_API_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'https://api.goshippo.com/shipments/',
      shipmentData,
      config
    );

    dispatch({
      type: SHIPMENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHIPMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:9124/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_PAY_FAIL,
      });
    }
  };

export const sendSms = (to, price) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_SMS_REQUEST,
    });

    const message = `Thank you for your purchase of $${price.toFixed(
      2
    )}! Your payment has been successfully received and your order is being processed. We will keep you updated on the status of your order.`;

    const { data } = await axios.post('http://localhost:9125/api/sms/send', {
      to,
      message,
    });

    dispatch({
      type: ORDER_SMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }

    dispatch({
      type: ORDER_SMS_FAIL,
    });
  }
};

export const sendEmail = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_EMAIL_REQUEST,
    });

    const {
      userLogin: { userInfo },
      orderDetails: { order },
    } = getState();

    const tableData = order.orderItems.map((item) => ({
      product: `<img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px;" />`,
      name: item.name,
      total: `$${item.price} x ${item.quantity} = $${
        item.price * item.quantity
      }`,
    }));

    const mailData = {
      to: `${userInfo.email}`,
      subject: `Order ${orderId}: order confirmation`,
      mail: {
        header: `${userInfo.name}`,
        intro: `Thank you for shopping with us. Your order ${orderId} is confirmed. We'll let you know when your order ships.`,
        tableData: tableData,
        action: {
          buttonText: 'Check Order',
          buttonLink: `http://localhost:3000/order/${orderId}`,
        },
        outro: `\n\nThank you for shopping with us.`,
      },
    };

    const { data } = await axios.post(
      'http://localhost:9123/v1/send',
      mailData
    );

    dispatch({
      type: ORDER_EMAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }

    dispatch({
      type: ORDER_EMAIL_FAIL,
    });
  }
};

// get orderdetails by userID

export const getOrderDetailsByUserId = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_BY_USER_ID_REQUEST,
    });

    console.log('userId', userId);

    const { data } = await axios.get(
      `http://localhost:9124/api/orders/user/${userId}`
    );

    dispatch({
      type: ORDER_DETAILS_BY_USER_ID_SUCCESS,
      payload: data,
    });

    localStorage.setItem('orderDetailsByUserId', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_BY_USER_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
