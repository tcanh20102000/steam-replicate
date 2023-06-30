import React from "react";
import Navbar from "../Navbar";
import Home from "../Home/index.js";
import AppDetail from "../AppDetail";
import GenrePage from "../../pages/GenrePage";
import Cart from "../../pages/Cart";
import { Footer } from "../Footer";
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
              <Route exact path="/genre/:genre" element={<GenrePage />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </>
      </Router>
    );
}