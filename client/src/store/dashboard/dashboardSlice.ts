import { createSlice } from "@reduxjs/toolkit";
import { DashBoardState } from ".";

const initialState: DashBoardState = {
  user: [],
  userTeams: [],
  activeTeam: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    onSetUser: (state, { payload }) => {
      state.user = payload.user;
    },
    onLogOutUser: (state) => {
      state.user = [];
    },
    onSetUserTeams: (state, { payload }) => {
      state.userTeams = payload.userTeams;
    },
    onSetActiveTeam: (state, { payload }) => {
      state.activeTeam = state.userTeams.filter((team) => team.id === payload.activeTeam);
    },
  },
});

export const { onSetUser, onLogOutUser } = dashboardSlice.actions;

export default dashboardSlice.reducer;
