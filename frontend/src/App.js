import { Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import './index.css';
import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import SplashPage from './components/SplashPage';
import CreateLairFormPage from './components/CreateLairFormPage';
import ShowOneLairPage from './components/ShowOneLairPage';
import EditLairFormPage from './components/EditLairFormPage';
import DeleteLairFormPage from './components/DeleteLairFormPage';
import ShowLairsPage from './components/ShowLairsPage';


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
          <SplashPage title="Welcome to Lairbnb"/>
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/spots">
          <ShowLairsPage />
        </Route>
        <Route path="/spots/new">
          <CreateLairFormPage />
        </Route>
        <Route path="/spots/:spotId/edit">
          <EditLairFormPage />
        </Route>
        <Route path="/spots/:spotId/delete">
          <DeleteLairFormPage />
        </Route>
        <Route path="/spots/:spotId">
          <ShowOneLairPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
