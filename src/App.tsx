import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./assets/index.scss";
import Heading from "./components/Heading";

import HomeOpenBeta from "./components/HomeOpenBeta";
import Regulation from "./components/Regulation/Regulation";
import Results from "./components/Results";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<HomeOpenBeta />} /> */}
          <Route path="results" element={<Results />} />
          <Route path="regulation" element={<Regulation />} />
        </Routes>
      </BrowserRouter>
      {/* <HomeOpenBeta /> */}
    </>
  );
}

export default App;
