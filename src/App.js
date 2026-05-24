import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Articles from "./components/Articles";
import AddArticle from "./components/AddArticle";
import UserProfileCard from "./components/UserProfileCard";
import RightSidebar from "./components/RightSidebar";
import MessagingWidget from "./components/MessagingWidget";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Article from "./components/Article";

function App() {
  return (
    <Router>
      <div className="container-fluid px-2 px-md-4" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/article/:id" element={<Article />} />
          <Route
            path="/"
            element={
              <div className="row g-4" style={{ marginTop: "85px" }}>
                {/* Left Column: Profile Card & Stats (Desktop only) */}
                <div className="col-12 col-lg-3 d-none d-lg-block">
                  <UserProfileCard />
                </div>

                {/* Center Column: Composer & Post Feed (Mobile, Tablet, Desktop) */}
                <div className="col-12 col-md-8 col-lg-6">
                  <AddArticle />
                  <Articles />
                </div>

                {/* Right Column: Promoted Widgets & Copyright Footer (Tablet & Desktop only) */}
                <div className="col-12 col-md-4 col-lg-3 d-none d-md-block">
                  <RightSidebar />
                </div>
              </div>
            }
          />
        </Routes>
        <Navbar />
        <MessagingWidget />
      </div>
    </Router>
  );
}

export default App;
