import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import { Navigationbar } from './components/Navigationbar'
import { Test } from './components/test'
import { Posts } from './features/post/Posts'

const App = () => {
  return (
    <Router>
      <Navigationbar />
      <Switch>
          <Route exact path="/">
            <Posts />
          </Route>
          <Route path="/post/:id" children={<Test />} />
          <Route path="*">
            <p>404 - could not be found</p>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
