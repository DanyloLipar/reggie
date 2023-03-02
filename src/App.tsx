import React from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/index.scss";
import HomeOpenBeta from "./components/HomeOpenBeta";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeOpenBeta />} />
      </Routes>
    </>
  );
}

export default App;
