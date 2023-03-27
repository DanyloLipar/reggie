import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
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
import {
  setModal,
  setModalType,
  setNotice,
  setTitle,
} from "../../core/store/reducers/modal/modalSlice";
import { windowModalType } from "../../core/types";
import { useNavigate } from "react-router-dom";

const MainPageClosedBeta = () => {
  const [joinedList, setJoinedList] = useState(false);

  const { currentUser } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useLogout();

  const handleGoogleSignIn = async (values: any) => {
    const encoded_values: App.GoogleLogin = jwtDecode(values.credential);
    try {
      const response = await AuthService.loginGoogle(encoded_values);

      localStorage.setItem("savedUser", JSON.stringify(response?.data));

      dispatch(setUser(response?.data));
      dispatch(setIsAuth());
      dispatch(setModalType(windowModalType.notificationModal));
      dispatch(setTitle("Success!"));
      dispatch(setNotice("Logged in successfully."));

      if (response?.data.userLevel === 0) {
        navigate("/");
      }
    } catch (errors: any) {
      dispatch(setModalType(windowModalType.notificationModal));
      dispatch(setTitle("Error!"));
      dispatch(setNotice("Login failed."));
    }

    dispatch(setModal());
  };

  const joinWaitingList = async () => {
    if (currentUser) {
      if (currentUser.userLevel === 1) {
        dispatch(setModalType(windowModalType.notificationModal));
        dispatch(setTitle("Warn!"));
        dispatch(setNotice("On waiting list already."));
        dispatch(setModal());
        return;
      }
      try {
        await AppService.joinWaitingList(currentUser?.userId);
        localStorage.setItem(
          "savedUser",
          JSON.stringify({ ...currentUser, userLevel: 1 })
        );
        dispatch(setUser({ ...currentUser, userLevel: 1 }));
        dispatch(setModalType(windowModalType.notificationModal));
        dispatch(setTitle("Success!"));
        dispatch(
          setNotice(
            `Successfully added user ${currentUser?.userId} to the waiting list!`
          )
        );
      } catch (errors: any) {
        dispatch(setModalType(windowModalType.notificationModal));
        dispatch(setTitle("Error!"));
        dispatch(setNotice("Some errors occured."));
      }
    } else {
      dispatch(setModalType(windowModalType.notificationModal));
      dispatch(setTitle("Error!"));
      dispatch(setNotice("Login in first."));
    }
    dispatch(setModal());
  };

  const googleButtonResizer = () => {
    if (window.screen.width > 1024) {
      return undefined;
    } else if (window.screen.width <= 350) {
      return "small";
    } else {
      return "medium";
    }
  };

  return (
    <>
      <header className="heading">
        <div className="heading__logo" onClick={() => navigate("/")}>
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
                  size={googleButtonResizer()}
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
          onClick={joinWaitingList}>
          Join Waitlist
        </button>
      </div>
      <Categories />
    </>
  );
};

export default MainPageClosedBeta;
