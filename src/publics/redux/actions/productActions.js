import axios from 'axios';
// Actions
import { GET_PRODUCTS } from '../actions/types';

export const getProducts = () => {
  return {
    type: GET_PRODUCTS,
    payload: axios.get('http://192.168.1.121:3333/api/v1/products')
  };
};
