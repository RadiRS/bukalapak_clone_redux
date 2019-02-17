import { GET_PRODUCTS } from '../actions/types';

const initialState = { products: [], product: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state };

    default:
      return state;
  }
}
