import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import MainPageClosedBeta from "./components/MainPageClosedBeta";
import MainPageOpenBeta from "./components/MainPageOpenBeta";

import "./assets/index.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPageOpenBeta />} />
          <Route path="/closed-beta" element={<MainPageClosedBeta />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
