import axios from 'axios';
import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR } from './types';
import { setAlert } from './alert';

export const getProfile = profileId => async dispatch => {
  try {
    const res = await axios.get(`/api/profiles/${profileId}`);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error?.response?.statusText,
        status: error?.response?.status,
      },
    });
  }
};

export const getProfiles = () => async dispatch => {
  try {
    const res = await axios.get(`/api/profiles/`);
    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error?.response?.statusText,
        status: error?.response?.status,
      },
    });
  }
};

export const updateProfile = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.patch('/api/profiles', formData, config);

    dispatch({ type: GET_PROFILE, payload: res.data });

    history.push('/profile');
  } catch (error) {
    const { errors } = error?.response?.data;
    if (errors) {
      errors.forEach((error, i) =>
        dispatch(setAlert(error.msg, 'danger', (i + 1) * 1000))
      );
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText, // should give us the error text
        status: error.response.status,
      },
    });
  }
};

export const createProfile = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profiles', formData, config);

    dispatch({ type: GET_PROFILE, payload: res.data });

    history.push('/profile');
  } catch (error) {
    const { errors } = error?.response?.data;
    if (errors) {
      errors.forEach((error, i) =>
        dispatch(setAlert(error.msg, 'danger', (i + 1) * 1000))
      );
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText, // should give us the error text
        status: error.response.status,
      },
    });
  }
};
