import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashBoardState } from ".";
import { UserTeams } from "./interfaces";

const initialState: DashBoardState = {
  user: [],
  userTeams: [],
  activeTeam: null,
  membersActiveTeam: [],
  metricsForToday: [],
  linesMetrics: [],
  dataAmount: [],
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
      state.linesMetrics = [];
      state.dataAmount = [];
      state.metricsForToday = [];
      state.membersActiveTeam = [];
    },
    onLoadingTeam: (state) => {
      state.isLoading = true;
    },
    cleanActiveTeam: (state) => {
      state.activeTeam = null;
      state.membersActiveTeam = [];
      state.metricsForToday = [];
      state.linesMetrics = [];
      state.dataAmount = [];
    },
    onSetUserTeams: (
      state,
      action: PayloadAction<{
        userTeams: UserTeams[];
      }>
    ) => {
      state.userTeams = action.payload.userTeams;
      state.isLoading = false;
    },
    onSetActiveTeam: (
      state,
      action: PayloadAction<{
        id: number;
      }>
    ) => {
      const userTeam = state.userTeams.find((team) => team.id === action.payload.id);
      state.activeTeam = userTeam;
      state.isLoading = false;
    },
    onSetActiveTeamMembers: (
      state,
      action: PayloadAction<{
        members: Members[];
      }>
    ) => {
      state.isLoading = true;
      state.membersActiveTeam = action.payload.members;
    },
    onSaveMetricsForToday: (state, { payload }) => {
      state.metricsForToday = payload.metricsForToday;
      state.linesMetrics = payload.linesMetrics;
      state.dataAmount = payload.dataAmount;
      state.isLoading = false;
    },

    onCreateTeam: (
      state,
      action: PayloadAction<{
        team: UserTeams;
      }>
    ) => {
      state.userTeams.push(action.payload.team);
      state.isLoading = false;
    },
  },
});

export const {
  onSetUser,
  onLogOutUser,
  onSetUserTeams,
  onLoadingTeam,
  onSetActiveTeam,
  onCreateTeam,
  onSetActiveTeamMembers,
  cleanActiveTeam,
  onSaveMetricsForToday,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
