import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

import Categories from "../Categories";

import AppService from "../../core/services/app.service";
import AuthService from "../../core/services/auth.service";
import { setIsAuth, setUser } from "../../core/store/reducers/auth/authSlice";
import { useAppSelector } from "../../core/store";
import { App } from "../../core/models";

import logo from "../../assets/photos/logo.svg";
import googleLogo from "../../assets/photos/google.svg";
import { useLogout } from "../../core/hooks/useLogout";

const MainPageOpenBeta = () => {
  const [inpQuery, setInpQuery] = useState("");

  const user = useAppSelector((state) => state.auth.currentUser);

  const navigate = useNavigate();
  const { logout } = useLogout();
  const dispatch = useDispatch();

  const currUser = JSON.parse(localStorage.getItem("savedUser") || "{}");

  useEffect(() => {
    if (localStorage.getItem("savedUser")) {
      dispatch(setUser(currUser));
      dispatch(setIsAuth());
    }
  }, []);

  const handleGoogleSignIn = async (values: any) => {
    const encoded_values: App.GoogleLogin = jwtDecode(values.credential);
    try {
      const response = await AuthService.loginGoogle(encoded_values);

      localStorage.setItem("savedUser", JSON.stringify(response?.data));
      dispatch(setUser(response?.data));
      dispatch(setIsAuth());
    } catch (errors: any) {
      toast.error("Login failed!");
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (user) {
      if (inpQuery) {
        performSearch();
      } else {
        toast.error("Please provide search details");
      }
    } else {
      toast.error("Sign in first");
    }
  };

  const performSearch = async () => {
    try {
      const response = await AppService.searchPerform({
        userId: user?.userId,
        query: inpQuery,
      });

      navigate(`/results/${response?.data?.searchId}`);
    } catch (errors: any) {
      toast.error("Not Found!");
    }
  };

  return (
    <>
      <header className="heading">
        <div className="heading__logo">
          <img className="heading__logo-image" src={logo} alt="logo" />
        </div>
        <div className="heading__buttons">
          <div className="heading__buttons-beta">Beta</div>
          {!user ? (
            <label className="heading__buttons-google button-google">
              <div className="button-google__box">
                <img
                  className="button-google__box-icon"
                  src={googleLogo}
                  alt="google"
                />
                <span className="button-google__box-text">
                  Sign in with Google
                </span>
              </div>
              <div className="button-google__click">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    handleGoogleSignIn(credentialResponse);
                  }}
                />
              </div>
            </label>
          ) : (
            <button onClick={logout} className="overview-top-btn">
              <span className="overview-top-btn__txt">Sign out</span>
            </button>
          )}
        </div>
      </header>
      <div className="general-info general-open">
        <p className="general-info__title">
          Accelerate time to market with instant regulatory requirements.
        </p>
        <p className="general-info__subtitle">
          <span className="general-info__subtitle-colored">Regy</span> is
          trained on mountains of federal, state, and local regulations, so you
          don't have to be.
        </p>
        <form onSubmit={handleSubmit} className="general-info__functional">
          <div className="general-info__functional-search functional-search">
            <div className="functional-search__inp">
              <div className="module-border-wrap">
                <div className="module">
                  <input
                    className="functional-search__inp-item"
                    type="text"
                    placeholder="ie. ‘a smart lock’, ‘extension in NYC’"
                    value={inpQuery}
                    onChange={(event) => setInpQuery(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <span className="functional-search__description">
              By using Regy, I agree that it is for research purposes only and
              does not constitute or provide legal advice.
            </span>
          </div>
          <button type="submit" className="general-info__functional-btn">
            Try for free
          </button>
        </form>
      </div>
      <Categories />
    </>
  );
};

export default MainPageOpenBeta;
