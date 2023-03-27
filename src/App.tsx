import { Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import MainPageClosedBeta from "./components/MainPageClosedBeta";
import MainPageOpenBeta from "./components/MainPageOpenBeta";
import Regulation from "./components/Regulation/Regulation";
import Results from "./components/Results";

import "./assets/index.scss";
import RequireAuth from "./components/RequireAuth";
import ModalWindow from "./components/ModalWindow";

function App() {
  return (
    <>
      <ModalWindow />
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_KEY}>
        <Routes>
          <Route path="/" element={<MainPageOpenBeta />} />
          <Route element={<RequireAuth />}>
            <Route path="/results-overview/:searchId" element={<Results />} />
            <Route
              path="/regulation/:searchId/:articleId"
              element={<Regulation />}
            />
          </Route>
          <Route path="/closed-beta" element={<MainPageClosedBeta />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
