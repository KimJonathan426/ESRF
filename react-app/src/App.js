import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
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
import RequiredPlayerCreation from './components/RequiredPlayerCreation';
import { authenticate } from './store/session';
import EditPlayerStatSheet from './components/EditPlayerStatSheet';
import PlayerForm from './components/PlayerForm';

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
        <ProtectedRoute path='/leagues/new' exact={true} >
          <BaseLeagueForm />
        </ProtectedRoute>
        <ProtectedRoute path='/leagues/:leagueId/required-players/new' exact={true} >
          <RequiredPlayerCreation />
        </ProtectedRoute>
        <ProtectedRoute path='/leagues' exact={true} >
          <LeagueList />
        </ProtectedRoute>
        <ProtectedRoute path='/leagues/:leagueId' exact={true} >
          <LeagueHome />
        </ProtectedRoute>
        <ProtectedRoute path='/leagues/:leagueId/players/new' exact={true} >
          <PlayerForm />
        </ProtectedRoute>
        <ProtectedRoute path='/leagues/:leagueId/players/edit/stats' exact={true} >
          <EditPlayerStatSheet />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
          <Link to='/leagues'>Leagues Page</Link>
          <Link to='/leagues/new'>Create League</Link>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
