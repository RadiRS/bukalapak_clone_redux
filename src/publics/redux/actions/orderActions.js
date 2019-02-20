import axios from 'axios';
import { REST_API } from '../../../utils/constants';
// Actions
import {
  GET_ORDERS,
  DELETE_ORDER,
  CREATE_ORDER,
  INC_ORDER_QTY,
  DEC_ORDER_QTY
} from '../actions/types';

export const getOrders = () => {
  return {
    type: GET_ORDERS,
    payload: axios.get(`${REST_API}/orders`)
  };
};

export const createOrder = product => async dispatch => {
  const data = {
    product_id: product.id,
    qty: 1,
    price: product.price
  };

  const res = await axios.post(`${REST_API}/order`, data);

  dispatch({
    type: CREATE_ORDER,
    payload: res.data
  });
};

export const deleteOrder = product => async dispatch => {
  const res = await axios.delete(`${REST_API}/order/${product.id}`);

  dispatch({
    type: DELETE_ORDER,
    payload: res.data
  });
};

export const incOrderQty = product => async dispatch => {
  const data = {
    qty: product.qty + 1,
    price: product.products.price * (product.qty + 1)
  };

  const res = await axios.patch(`${REST_API}/order/${product.id}`, data);

  dispatch({
    type: INC_ORDER_QTY,
    payload: { data: res.data, product: product }
  });
};

export const decOrderQty = product => async dispatch => {
  const qty = product.qty <= 1 ? 1 : product.qty - 1;
  const data = {
    qty: qty,
    price: product.products.price * qty
  };

  const res = await axios.patch(`${REST_API}/order/${product.id}`, data);

  dispatch({
    type: DEC_ORDER_QTY,
    payload: { data: res.data, product: product }
  });
};
