import axios from 'axios';

export const setAuthToken = authToken => {
  if (authToken) {
    axios.defaults.headers.common['x-auth-token'] = authToken;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
