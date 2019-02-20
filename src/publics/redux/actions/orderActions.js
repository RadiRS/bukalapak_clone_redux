import axios from 'axios';
import { REST_API } from '../../../utils/constants';
// Actions
import { GET_ORDERS, CREATE_ORDER } from '../actions/types';

export const getOrders = () => {
  return {
    type: GET_ORDERS,
    payload: axios.get(`${REST_API}/orders`)
  };
};

export const createOrder = product => async dispatch => {
  const res = await axios.post(`${REST_API}/order`, product);

  dispatch({
    type: CREATE_ORDER,
    payload: res.data
  });
};
