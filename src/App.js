import React from "react";
import "./App.css";
import { Navigationbar } from './components/Navigationbar'
import { Contentbox } from './components/Contentbox'

function App() {
  return (
    <div>
      <Navigationbar />
      <div id='posts'>
        <Contentbox />
        <Contentbox />
      </div>
    </div>
  );
}

export default App;
