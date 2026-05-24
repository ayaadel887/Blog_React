import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Articles from "./components/Articles";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Article from "./components/Article";

function App() {
  return (
    <Router>
      <div
        className="container-fluid px-2 px-md-4"
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/article/:id" element={<Article />} />
          <Route
            path="/"
            element={
              <div style={{ marginTop: "85px" }}>
                <Articles />
              </div>
            }
          />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
