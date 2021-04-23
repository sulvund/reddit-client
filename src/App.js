import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import "./App.css";
import { Navigationbar } from './components/Navigationbar'
import { Post } from './features/post/Post'
import { Feed } from './features/feed/Feed'

const App = () => {
  return (
    <Router>
      <Navigationbar />
      <Switch>
          <Redirect exact from="/" to="/r/popular" />
          <Route path="/r/:subreddit/:type/:id/:title_id">
            <Post />
          </Route>
          <Route path="/:r/:subreddit">
              <Feed />
          </Route>
          <Route path="*">
            <p>404 - could not be found</p>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
