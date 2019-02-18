import axios from 'axios';
import { REST_API } from '../../../utils/constants';
// Actions
import { GET_PRODUCTS } from '../actions/types';

export const getProducts = () => {
  return {
    type: GET_PRODUCTS,
    payload: axios.get(`${REST_API}/products`)
  };
};
