import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

import Categories from "../Categories";
import { App } from "../../core/models";
import AuthService from "../../core/services/auth.service";
import AppService from "../../core/services/app.service";

import logo from "../../assets/photos/logo.svg";
import googleLogo from "../../assets/photos/google.svg";
import { useAppSelector } from "../../core/store/index";
import { setIsAuth, setUser } from "../../core/store/reducers/auth/authSlice";
import { useLogout } from "../../core/hooks/useLogout";

const MainPageClosedBeta = () => {
  const [joinedList, setJoinedList] = useState(false);
  const { currentUser } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { logout } = useLogout();

  useEffect(() => {
    if (localStorage.getItem("savedUser")) {
      const currUser = JSON.parse(localStorage.getItem("savedUser") || "{}");

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

  const joinWaitingList = async () => {
    if (currentUser) {
      if (currentUser.userLevel === 1) {
        toast.warning("On waiting list already");
        return;
      }
      try {
        await AppService.joinWaitingList(currentUser?.userId);
        localStorage.setItem(
          "savedUser",
          JSON.stringify({ ...currentUser, userLevel: 1 })
        );
        dispatch(setUser({ ...currentUser, userLevel: 1 }));
        toast.success(
          `Successfully added user ${currentUser?.userId} to the waiting list!`
        );
      } catch (errors: any) {
        toast.error("Some errors occured.");
      }
    } else {
      toast.error("Sign in first");
    }
  };

  return (
    <>
      <header className="heading">
        <div className="heading__logo">
          <img className="heading__logo-image" src={logo} alt="logo" />
        </div>
        <div className="heading__buttons">
          {!currentUser ? (
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
      <div className="general-info general-closed">
        <p className="general-info__title">
          Accelerate time to market with instant regulatory requirements.
        </p>
        <p className="general-info__subtitle">
          <span className="general-info__subtitle-bolder">Regy</span> is trained
          on mountains of federal, state, and local regulations, so you don't
          have to be.
        </p>
        <button
          className="general-info__waitlist-btn"
          onClick={joinWaitingList}
        >
          Join Waitlist
        </button>
      </div>
      <Categories />
    </>
  );
};

export default MainPageClosedBeta;
