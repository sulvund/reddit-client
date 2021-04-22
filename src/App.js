import React from "react";
import "./App.css";
import { Navigationbar } from './components/Navigationbar'
import { Posts } from './features/post/Posts'

const App = () => {
  return (
    <div>
      <Navigationbar />
      <Posts />
    </div>
  );
}

export default App;
