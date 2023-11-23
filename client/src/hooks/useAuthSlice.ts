import { useDispatch, useSelector } from "react-redux";
import { onChecking, onLogOut, onLogin } from "../store/auth/authSlice";

import { users } from ".././mocks/data";
import { useNavigateTo } from ".";
export const useAuthSlice = () => {
  const dispatch = useDispatch();
  const { handleNavigate } = useNavigateTo();

  const startCheckingUser = (data) => {
    console.log("Me llamaron");

    dispatch(onChecking());

    const foundUser = users.find((user) => user.email === data.Email && user.password === data.Password);

    if (foundUser) {
      dispatch(onLogin(data));
      handleNavigate("/dashboard");
    } else {
      dispatch(onLogOut("Email or Password invalid"));
    }
  };

  return {
    startCheckingUser,
  };
};
