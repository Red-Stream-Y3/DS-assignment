import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  SHIPMENT_CREATE_REQUEST,
  SHIPMENT_CREATE_SUCCESS,
  SHIPMENT_CREATE_FAIL,
  SHIPMENT_CREATE_RESET,
  ORDER_SMS_REQUEST,
  ORDER_SMS_SUCCESS,
  ORDER_SMS_FAIL,
  ORDER_SMS_RESET,
  ORDER_EMAIL_REQUEST,
  ORDER_EMAIL_SUCCESS,
  ORDER_EMAIL_FAIL,
  ORDER_EMAIL_RESET,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingDetails: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const shipmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SHIPMENT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case SHIPMENT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case SHIPMENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SHIPMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderSmsReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_SMS_REQUEST:
      return {
        loading: true,
      };
    case ORDER_SMS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_SMS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_SMS_RESET:
      return {};
    default:
      return state;
  }
};

export const orderEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_EMAIL_REQUEST:
      return {
        loading: true,
      };
    case ORDER_EMAIL_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_EMAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_EMAIL_RESET:
      return {};
    default:
      return state;
  }
};
