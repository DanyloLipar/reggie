import React from "react";
import logo from "../../assets/photos/logo.svg";
import googleLogo from "../../assets/photos/google.svg";

const Heading = () => {
  return (
    <div>
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div>
        <div>Beta</div>
        <label>
          <div>
            <img src={googleLogo} alt="google" />
            <span>Sign in with Google</span>
          </div>
          <div></div>
        </label>
      </div>
    </div>
  );
};

export default Heading;
