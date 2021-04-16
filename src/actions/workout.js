import axios from 'axios';
import { GET_WORKOUTS, WORKOUT_ERROR, GET_WORKOUT } from './types';
import { setAlert } from './alert';

export const getWorkoutsByUser = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/workouts/user/${userId}`);
    dispatch({
      type: GET_WORKOUTS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: {
        msg: error?.response?.statusText,
        code: error?.response?.statusCode,
      },
    });
  }
};

export const getWorkouts = () => async dispatch => {
  try {
    const { data } = await axios.get(`/api/workouts`);
    dispatch({
      type: GET_WORKOUTS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: {
        msg: error?.response?.statusText,
        code: error?.response?.statusCode,
      },
    });
  }
};

export const getWorkout = workoutId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/workouts/${workoutId}`);
    dispatch({
      type: GET_WORKOUT,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: {
        msg: error?.response?.statusText,
        code: error?.response?.statusCode,
      },
    });
  }
};

export const postWorkout = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.post('/api/workouts', formData, config);

    history.push('/dashboard');
  } catch (error) {
    console.log({ error: error?.response?.data });
    const { errors } = error?.response?.data;
    if (errors) {
      errors.forEach((error, i) =>
        dispatch(setAlert(error.msg, 'danger', (i + 1) * 1000))
      );
    }
    dispatch({
      type: WORKOUT_ERROR,
      payload: {
        msg: error?.response?.statusText,
        code: error?.response?.statusCode,
      },
    });
  }
};
