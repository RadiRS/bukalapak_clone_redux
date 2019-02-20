import {
  GET_ORDERS_PENDING,
  GET_ORDERS_REJECTED,
  GET_ORDERS_FULFILLED,
  CREATE_ORDER,
  UPDATE_ORDER_PENDING,
  UPDATE_ORDER_REJECTED,
  UPDATE_ORDER_FULFILLED,
  DELETE_ORDER_PENDING,
  DELETE_ORDER_REJECTED,
  DELETE_ORDER_FULFILLED
} from '../actions/types';

const initialState = { orders: [], isLoading: false, message: '' };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case GET_ORDERS_REJECTED:
      return {
        ...state,
        isLoading: false
      };

    case GET_ORDERS_FULFILLED:
      return {
        ...state,
        orders: action.payload.data,
        isLoading: false
      };

    case CREATE_ORDER:
      let productInStateOrders = state.orders.find(
        m => m.id === action.payload.data.id
      );

      if (productInStateOrders) {
        return { ...state, message: action.payload.status };
      } else {
        return {
          ...state,
          orders: [action.payload.data, ...state.orders],
          message: action.payload.status
        };
      }

    default:
      return state;
  }
}
