import React from "react";
import "./App.css";
import { Navigationbar } from './components/Navigationbar'
import { Posts } from './features/post/Posts'

const App = () => {
  return (
    <div>
      <Navigationbar />
      <div id='posts'>
        <Posts />
      </div>
    </div>
  );
}

export default App;
