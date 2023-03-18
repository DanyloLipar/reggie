import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

import AppService from "../../core/services/app.service";
import AuthService from "../../core/services/auth.service";
import { setIsAuth } from "../../core/store/reducers/auth/authSlice";
import { useAppSelector } from "../../core/store";
import Categories from "../Categories";
import { App } from "../../core/models";

import logo from "../../assets/photos/logo.svg";
import googleLogo from "../../assets/photos/google.svg";

const MainPageOpenBeta = () => {
  const [inpQuery, setInpQuery] = useState("");

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const user = useAppSelector((state) => state.auth.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleSignIn = async (values: any) => {
    const encoded_values: App.GoogleLogin = jwtDecode(values.credential);

    try {
      await AuthService.loginGoogle(encoded_values);
    } catch (errors: any) {
      console.log(errors)
      toast.error("Login failed!");
    }
  };

  const performSearch = async () => {
    try {
      const response = await AppService.searchPerform({
        userId: user?.userId,
        query: inpQuery,
      });
      // navigate(`/results/${response?.searchId}`)
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
        <div className="general-info__functional">
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
                    onKeyDown={performSearch}
                  />
                </div>
              </div>
            </div>
            <span className="functional-search__description">
              By using Regy, I agree that it is for research purposes only and
              does not constitute or provide legal advice.
            </span>
          </div>
          <button className="general-info__functional-btn">Try for free</button>
        </div>
      </div>
      <Categories />
    </>
  );
};

export default MainPageOpenBeta;
