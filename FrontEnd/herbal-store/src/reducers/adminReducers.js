import {
  COMMISSION_DETAILS_REQUEST,
  COMMISSION_DETAILS_SUCCESS,
  COMMISSION_DETAILS_FAIL,
  COMMISSION_DETAILS_RESET,
} from '../constants/adminConstants';

export const getCommissionReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMISSION_DETAILS_REQUEST:
      return { loading: true };
    case COMMISSION_DETAILS_SUCCESS:
      return { loading: false, commission: action.payload };
    case COMMISSION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case COMMISSION_DETAILS_RESET:
      return {
        ...state,
        commission: {},
      };
    default:
      return state;
  }
};
