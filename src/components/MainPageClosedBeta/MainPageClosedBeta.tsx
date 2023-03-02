import Categories from "../Categories";

import logo from "../../assets/photos/logo.svg";
import googleLogo from "../../assets/photos/google.svg";

const MainPageClosedBeta = () => {
  return (
    <>
      <header className="heading">
        <div className="heading__logo">
          <img className="heading__logo-image" src={logo} alt="logo" />
        </div>
        <div className="heading__buttons">
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
      <div className="general-info general-closed">
        <p className="general-info__title">
          Accelerate time to market with instant regulatory requirements.
        </p>
        <p className="general-info__subtitle">
          <span className="general-info__subtitle-bolder">Regy</span> is trained
          on mountains of federal, state, and local regulations, so you don't
          have to be.
        </p>
        <button className="general-info__waitlist-btn">Join Waitlist</button>
      </div>
      <Categories />
    </>
  );
};

export default MainPageClosedBeta;
