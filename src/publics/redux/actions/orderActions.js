import axios from 'axios';
import { REST_API } from '../../../utils/constants';
// Actions
import { GET_ORDERS } from '../actions/types';

export const getOrders = () => {
  return {
    type: GET_ORDERS,
    payload: axios.get(`${REST_API}/orders`)
  };
};
