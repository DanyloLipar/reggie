import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";

import MainPageClosedBeta from "./components/MainPageClosedBeta";
import MainPageOpenBeta from "./components/MainPageOpenBeta";
import Regulation from "./components/Regulation/Regulation";
import Results from "./components/Results";

import RequireAuth from "./components/RequireAuth";
import ModalWindow from "./components/ModalWindow";

import { setIsAuth, setUser } from "./core/store/reducers/auth/authSlice";
import "./assets/index.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("savedUser")) {
      const currUser = JSON.parse(localStorage.getItem("savedUser") || "{}");

      dispatch(setUser(currUser));
      dispatch(setIsAuth());
    }
  }, []);
  return (
    <>
      <ModalWindow />
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_KEY}>
        <Routes>
          <Route path="/" element={<MainPageClosedBeta />} />
          <Route element={<RequireAuth />}>
            <Route path="/search" element={<MainPageOpenBeta />} />
            <Route path="/results-overview/:searchId" element={<Results />} />
            <Route
              path="/regulation/:searchId/:articleId"
              element={<Regulation />}
            />
          </Route>
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
