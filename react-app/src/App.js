import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import LeagueList from './components/LeagueList';
import LeagueHome from './components/LeagueHome';
import BaseLeagueForm from './components/BaseLeagueForm';
import { authenticate } from './store/session';

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.sessionUser);
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/leagues' exact={true} >
          <LeagueList />
        </ProtectedRoute>
        <ProtectedRoute path='/leagues/:leagueId' exact={true} >
          <LeagueHome />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
          <BaseLeagueForm />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
