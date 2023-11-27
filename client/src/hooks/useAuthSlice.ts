import { useDispatch, useSelector } from "react-redux";
import { onChecking, onLogOut, onLogin } from "../store/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { users } from ".././mocks/data";
import { useNavigateTo } from ".";
import { useEffect } from "react";
import { toast } from "react-toastify";
export const useAuthSlice = () => {
  const { loading, errorMessage, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { handleNavigate } = useNavigateTo();
  useEffect(() => {}, [loading]);

  const startCheckingUser = (data: string[]) => {
    dispatch(onChecking());

    setTimeout(() => {
      const foundUser = users.find((user) => user.email === data.Email && user.password === data.Password);
      if (foundUser) {
        dispatch(onLogin({ userId: foundUser.id }));
        handleNavigate("/dashboard");
        localStorage.setItem("userId", foundUser.id);
      } else {
        dispatch(onLogOut("Invalid Email or Password "));
      }
    }, 3000);
  };

  const startRegisteringUser = (data: string[]): void => {
    dispatch(onChecking());
    setTimeout(() => {
      const foundUser = users.find((user) => user.email === data.email);
      if (foundUser) {
        dispatch(onLogOut("Email already in use"));
      } else {
        toast.success("Successfully registered. Redirecting to login. 👍", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setTimeout(() => {
          dispatch(onLogOut());
          handleNavigate("/auth/login");
        }, 3000);
      }
    }, 3000);
  };
  return {
    startCheckingUser,
    loading,
    errorMessage,
    status,
    startRegisteringUser,
  };
};
