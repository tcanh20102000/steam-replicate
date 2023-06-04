import React from "react";
import Navbar from "../Navbar";
import Home from "../Home/index.js";
import AppDetail from "../AppDetail";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

export default function WholeApp(){
    return (
      <Router>
        <>
          <Navbar />
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/app/:appid" element={<AppDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </>
      </Router>
    );
}