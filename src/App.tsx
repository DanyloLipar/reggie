import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import MainPageClosedBeta from "./components/MainPageClosedBeta";
import MainPageOpenBeta from "./components/MainPageOpenBeta";
import Regulation from "./components/Regulation/Regulation";
import Results from "./components/Results";

import "./assets/index.scss";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_KEY}>
        <Routes>
          <Route path="/" element={<MainPageOpenBeta />} />
          <Route path="/closed-beta" element={<MainPageClosedBeta />} />
          <Route path="/results/:id" element={<Results />} />
          <Route
            path="/regulation/:searchId/:articleId"
            element={<Regulation />}
          />
        </Routes>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
