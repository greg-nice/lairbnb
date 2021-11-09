import { Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import SplashPage from './components/SplashPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
  // return (
    <>
      <Navigation isLoaded={isLoaded}/>
      <Switch>
        <Route exact path="/">
          <SplashPage />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route>
          <SignupFormPage path="/signup"/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
