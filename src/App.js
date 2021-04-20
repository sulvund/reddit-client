import React, { useEffect } from "react";
import "./App.css";
import { Navigationbar } from './components/Navigationbar'
import { Post } from './features/post/Post'

const App = () => {
  useEffect(() => {
    const data = fetchdata;
    return data;
  });

  const fetchdata = async () =>  {
    const response = await fetch('https://www.reddit.com/r/popular.json');
    const json = await response.json()
    return json;
  }

  return (
    <div>
      <Navigationbar />
      <div id='posts'>
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default App;
