import {
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_REJECTED,
  GET_PRODUCTS_FULFILLED,
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

const initialState = { products: [], isLoading: false };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_PENDING:
      return { isLoading: true };

    case GET_PRODUCTS_REJECTED:
      return { isLoading: false };

    case GET_PRODUCTS_FULFILLED:
      return {
        isLoading: false,
        products: action.payload.data
      };

    default:
      return state;
  }
}
