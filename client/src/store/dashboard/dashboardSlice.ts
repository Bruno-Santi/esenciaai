import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashBoardState } from ".";
import { UserTeams } from "./interfaces";

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
    onSetUserTeams: (state, action: PayloadAction<{ userTeams: UserTeams[] }>) => {
      state.userTeams = action.payload.userTeams;
    },
    onSetActiveTeam: (state, { payload }) => {
      state.activeTeam = state.userTeams.filter((team) => team.id === payload.activeTeam);
    },
  },
});

export const { onSetUser, onLogOutUser, onSetUserTeams } = dashboardSlice.actions;

export default dashboardSlice.reducer;
