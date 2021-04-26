import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import "./App.css";
import { Header } from './containers/Header/Header'
import { Feed } from './containers/Feed/Feed'
import { Subreddits } from './containers/Subreddits/Subreddits'

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
          <Redirect exact from="/" to="/r/pics" />
          <Route path="/r/:subredditURL">
            <div className='layout'>
              <Feed />
              <span className='aside'>
                <Subreddits/>
              </span>
            </div>
          </Route>
          <Route path="*">
            <p className='center'>404 - could not be found</p>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
