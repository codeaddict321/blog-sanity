import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import SinglePost from "./SinglePost";
import "./App.css";
import Navigation from "./Navigation";
function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog:slug" element={<SinglePost />} />
      </Routes>
    </>
  );
}

export default App;
