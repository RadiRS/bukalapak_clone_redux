import {
  GET_ORDERS_PENDING,
  GET_ORDERS_REJECTED,
  GET_ORDERS_FULFILLED,
  GET_PRODUCT_PENDING,
  GET_PRODUCT_REJECTED,
  GET_PRODUCT_FULLFILLED,
  CREATE_PRODUCT_PENDING,
  CREATE_PRODUCT_REJECTED,
  CREATE_PRODUCT_FULLFILLED,
  UPDATE_PRODUCT_PENDING,
  UPDATE_PRODUCT_REJECTED,
  UPDATE_PRODUCT_FULLFILLED,
  DELETE_PRODUCT_PENDING,
  DELETE_PRODUCT_REJECTED,
  DELETE_PRODUCT_FULLFILLED
} from '../actions/types';

const initialState = { orders: [], isLoading: false };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS_PENDING:
      return {
        orders: [],
        isLoading: true
      };

    case GET_ORDERS_REJECTED:
      return {
        orders: [],
        isLoading: false
      };

    case GET_ORDERS_FULFILLED:
      return {
        orders: action.payload.data,
        isLoading: false
      };

    default:
      return state;
  }
}
