import { Routes, Route } from "react-router-dom";
import Blog from "./Blog";
import Home from "./Home";
import SinglePost from "./SinglePost";
import "./App.css";
import Navigation from "./Navigation";
function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blog:slug" element={<SinglePost />} />
      </Routes>
    </>
  );
}

export default App;
