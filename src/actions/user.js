import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAR_WORKOUT,
} from './types';
import { setAlert } from './alert';
import { setAuthToken } from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');

    // load user into state
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (error) {
    // removes user object from state
    dispatch({ type: AUTH_ERROR });
  }
};

export const loginUser = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(formData);

    const { data } = await axios.post('/api/auth', body, config);

    // update state with user token
    dispatch({ type: LOGIN_SUCCESS, payload: data });

    // load user into state
    dispatch(loadUser());
  } catch (error) {
    const { errors } = error?.response?.data;
    console.log({ errors });

    if (errors) {
      errors.forEach((error, i) =>
        dispatch(setAlert(error.msg, 'danger', (i + 1) * 1000))
      );
    }

    dispatch({ type: LOGIN_FAIL });
  }
};

export const createUser = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(formData);

    const { data } = await axios.post('/api/users', body, config);

    // update state with user token
    dispatch({ type: REGISTER_SUCCESS, payload: data });

    // load user into state
    dispatch(loadUser());
  } catch (error) {
    const { errors } = error?.response?.data;

    if (errors) {
      errors.forEach((error, i) =>
        dispatch(setAlert(error.msg, 'danger', (i + 1) * 1000))
      );
    }

    dispatch({ type: REGISTER_FAIL });
  }
};

export const logout = () => async dispatch => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: CLEAR_WORKOUT });
};
