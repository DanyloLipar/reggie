import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

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
          <Route path="/results/:searchId" element={<Results />} />
          <Route
            path="/regulation/:searchId/:articleId"
            element={<Regulation />}
          />
        </Routes>
      </GoogleOAuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
