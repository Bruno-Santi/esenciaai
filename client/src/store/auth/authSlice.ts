import { createSlice } from "@reduxjs/toolkit";
const userLogged = localStorage.getItem("userLogged");
const initialState = {
  status: userLogged ? "authenticated" : "non-authenticated",
  user: userLogged ? JSON.parse(userLogged) : {},
  errorMessage: undefined,
  errorRegisterMessage: undefined,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      (state.status = "checking"),
        (state.user = {}),
        (state.errorMessage = undefined),
        (state.errorMessage = undefined);
      state.loading = true;
    },
    onLogin: (state, { payload }) => {
      (state.status = "authenticated"),
        (state.user = payload),
        (state.errorMessage = undefined),
        (state.errorMessage = undefined);
      state.loading = false;
    },
    onLogOut: (state, { payload }) => {
      state.status = "non-authenticated";
      state.user = {};
      state.errorMessage = payload;
      state.loading = false;
    },
    onLogOutRegister: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = undefined;
      state.errorRegisterMessage = payload || undefined;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
      state.errorRegisterMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogOut, clearErrorMessage, onLogOutRegister } = authSlice.actions;

export default authSlice.reducer;
