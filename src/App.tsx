import { Routes, Route, BrowserRouter } from "react-router-dom";

import MainPageClosedBeta from "./components/MainPageClosedBeta";
import MainPageOpenBeta from "./components/MainPageOpenBeta";
import Regulation from "./components/Regulation/Regulation";
import Results from "./components/Results";

import "./assets/index.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPageOpenBeta />} />
          <Route path="/closed-beta" element={<MainPageClosedBeta />} />
          <Route path="/results" element={<Results />} />
          <Route path="/regulation" element={<Regulation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
