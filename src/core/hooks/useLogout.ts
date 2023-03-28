import { useAppDispatch } from "../store";
import { clearUser } from "../store/reducers/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("savedUser");
    localStorage.removeItem("searchQuery");
    localStorage.removeItem("feedback");
    dispatch(clearUser());
    navigate("/");
  };

  return {
    logout,
  };
};
