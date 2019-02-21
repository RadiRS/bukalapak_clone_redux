import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { REST_API } from '../../../utils/constants';
// Actions
import { USER_LOGIN } from './types';

export const loginUser = userData => async dispatch => {
  const res = await axios.post(`${REST_API}/auth/login`, userData);

  if (!res.data.error) {
    _storeData(res.data);
    dispatch({
      type: USER_LOGIN,
      payload: res.data
    });
  }
};

const _storeData = async userData => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    // Error saving data
  }
};
