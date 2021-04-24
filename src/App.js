import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import "./App.css";
import { Header } from './containers/Header/Header'
import { Feed } from './containers/Feed/Feed'

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
          <Redirect exact from="/" to="/r/pics" />
          <Route path="/r/:subredditURL">
              <Feed />
          </Route>
          <Route path="*">
            <p className='center'>404 - could not be found</p>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
