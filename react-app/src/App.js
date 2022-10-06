import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './store/session';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LeagueList from './components/LeagueList';
import LeagueHome from './components/LeagueHome';
import BaseLeagueForm from './components/BaseLeagueForm';
import RequiredPlayerCreation from './components/RequiredPlayerCreation';
import EditPlayerStatSheet from './components/EditPlayerStatSheet';
import PlayerForm from './components/PlayerForm';
import TeamSettings from './components/TeamSettings';
import HomePage from './components/HomePage';
import LeagueSettings from './components/LeagueSettings';
import LeagueMembers from './components/LeagueMembers';
import PlayerList from './components/PlayerList';
import AboutPage from './components/AboutPage';
import PageNotFound from './components/PageNotFound';

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/leagues/new' exact={true} >
          <NavBar />
          <BaseLeagueForm />
        </ProtectedRoute>
        <ProtectedRoute path='/leagues/:leagueId/required-players/new' exact={true} >
          <NavBar />
          <RequiredPlayerCreation />
        </ProtectedRoute>
        <ProtectedRoute path='/leagues' exact={true} >
          <NavBar />
          <LeagueList sessionUser={sessionUser} />
        </ProtectedRoute>
        <ProtectedRoute path='/leagues/:leagueId' exact={true} >
          <NavBar />
          <LeagueHome sessionUser={sessionUser} />
        </ProtectedRoute>
        <ProtectedRoute path='/leagues/:leagueId/settings' exact={true} >
          <NavBar />
          <LeagueSettings sessionUser={sessionUser} />
        </ProtectedRoute>
        <ProtectedRoute path='/leagues/:leagueId/members' exact={true} >
          <NavBar />
          <LeagueMembers sessionUser={sessionUser} />
        </ProtectedRoute>
        <ProtectedRoute path='/leagues/:leagueId/players/new' exact={true} >
          <NavBar />
          <PlayerForm sessionUser={sessionUser} />
        </ProtectedRoute>
        <ProtectedRoute path='/leagues/:leagueId/players' exact={true} >
          <NavBar />
          <PlayerList sessionUser={sessionUser} />
        </ProtectedRoute>
        <ProtectedRoute path='/leagues/:leagueId/players/edit/stats' exact={true} >
          <NavBar />
          <EditPlayerStatSheet />
        </ProtectedRoute>
        <ProtectedRoute path='/leagues/:leagueId/teams/:teamNumber/settings' exact={true} >
          <NavBar />
          <TeamSettings sessionUser={sessionUser} />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <NavBar />
          <HomePage sessionUser={sessionUser} />
        </ProtectedRoute>
        <ProtectedRoute path='/about' exact={true} >
          <NavBar />
          <AboutPage />
        </ProtectedRoute>
        <Route>
          <NavBar />
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
