import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashBoardState } from ".";
import { UserTeams } from "./interfaces";
// const storedUserTeams = JSON.parse(localStorage.getItem("userTeams")) || [];
const initialState: DashBoardState = {
  user: [],
  userTeams: [],
  activeTeam: null,
  isLoading: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    onSetUser: (state, { payload }) => {
      state.user = payload.user;
      state.isLoading = false;
    },
    onLogOutUser: (state) => {
      state.user = [];
      state.activeTeam = null;
      state.userTeams = [];
    },
    onLoadingTeam: (state) => {
      state.isLoading = true;
    },
    onSetUserTeams: (state, action: PayloadAction<{ userTeams: UserTeams[] }>) => {
      state.userTeams = action.payload.userTeams;
      state.isLoading = false;
    },
    onSetActiveTeam: (state, action: PayloadAction<{ id: number }>) => {
      state.activeTeam = state.userTeams.find((team) => team.id === action.payload.id);
      state.isLoading = false;
    },
    onCreateTeam: (state, action: PayloadAction<{ team: UserTeams }>) => {
      state.userTeams.push(action.payload.team);
      state.isLoading = false;
    },
  },
});

export const { onSetUser, onLogOutUser, onSetUserTeams, onLoadingTeam, onSetActiveTeam, onCreateTeam } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
