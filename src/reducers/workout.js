import {
  GET_WORKOUT,
  GET_WORKOUTS,
  WORKOUT_ERROR,
  CLEAR_WORKOUT,
} from '../actions/types';

const initialState = {
  workouts: [],
  workout: null,
  loading: true,
  errors: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WORKOUT:
      return {
        ...state,
        loading: false,
        workout: payload,
      };
    case GET_WORKOUTS:
      return {
        ...state,
        loading: false,
        workouts: payload,
      };
    case WORKOUT_ERROR:
      return {
        ...state,
        loading: false,
        workouts: [],
        workout: null,
        errors: payload,
      };
    case CLEAR_WORKOUT:
      return {
        ...state,
        workouts: [],
        workout: null,
        loading: false,
      };
    default:
      return state;
  }
}
