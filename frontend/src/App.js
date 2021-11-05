import { Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session';
import SignupFormPage from './components/SignupFormPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
  // return (
    <Switch>
      <Route exact path="/">
        <h1>Hello from Home Page</h1>
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route>
        <SignupFormPage path="/signup"/>
      </Route>
    </Switch>
  );
}

export default App;
