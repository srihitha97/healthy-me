import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

// Redux
// eslint-disable-next-line import/order
import { Provider } from 'react-redux';
import store from './store';

import AppContainer from './components/layout/AppContainer';
import Nabvar from './components/layout/Navbar';
import Alert from './components/layout/Alert';

import themeObject from './theme';
import Landing from './components/containers/Landing';
import SignUp from './components/containers/SignUp';
import AppWrapper from './components/layout/AppWrapper';
import Dashboard from './components/containers/Dashboard';
import { setAuthToken } from './utils/setAuthToken';
import { loadUser } from './actions/user';
import PrivateRoute from './components/routing/PrivateRoute';
import Profile from './components/containers/Profile';
import ProfileById from './components/containers/ProfileById';
import CommunityWorkouts from './components/containers/CommunityWorkouts';
import Users from './components/containers/Users';
import Workout from './components/containers/Workout';
import EditProfile from './components/containers/EditProfile';
import CreateWorkout from './components/containers/CreateWorkout';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Raleway', sans-serif;
    font-size: 1.5rem;
    line-height: 1.6;
    background-color: ${({ theme }) => theme.darkestGrey};
    color: ${({ theme }) => theme.lightgrey};
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }

  img {
    width: 100%;
  }

  svg {
    height: 100%;
    width: 100%;
  }
`;

// set axios headers before app is loaded, if token is present
// occurs when refreshing page
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // load user object if token is set in locaStorage
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={themeObject}>
        <GlobalStyle />
        <Router>
          <AppContainer>
            <Nabvar />
            <Switch>
              <AppWrapper as="main">
                <Alert />
                <Route exact path="/" component={Landing} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/sign-up" component={SignUp} />
                <Route
                  exact
                  path="/community-workouts"
                  component={CommunityWorkouts}
                />
                <Route exact path="/workout/:id" component={Workout} />
                <Route exact path="/profile/:userId" component={ProfileById} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/edit-profile/:id"
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path="/create-workout"
                  component={CreateWorkout}
                />
              </AppWrapper>
            </Switch>
          </AppContainer>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
