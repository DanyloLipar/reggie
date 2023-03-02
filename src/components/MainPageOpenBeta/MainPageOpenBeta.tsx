import React from "react";
import Categories from "../Categories";
import logo from "../../assets/photos/logo.svg";
import googleLogo from "../../assets/photos/google.svg";

const MainPageOpenBeta = () => {
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
            <div className="button-google__click"></div>
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
