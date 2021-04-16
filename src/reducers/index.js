import { combineReducers } from 'redux';

import user from './user';
import alert from './alert';
import profile from './profile';
import workout from './workout';

export default combineReducers({
  user,
  alerts: alert,
  profile,
  workout,
});
