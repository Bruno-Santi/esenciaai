import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { DashBoardState } from ".";
import { UserTeams } from "./interfaces";
import { Members } from "../../mocks";
import { Members } from "../../mocks/data";
// const storedUserTeams = JSON.parse(localStorage.getItem("userTeams")) || [];
const initialState: DashBoardState =
  {
    user: [],
    userTeams: [],
    activeTeam:
      null,
    membersActiveTeam:
      [],
    isLoading:
      false,
  };

export const dashboardSlice =
  createSlice({
    name: "dashboard",
    initialState,
    reducers: {
      onSetUser: (
        state,
        { payload }
      ) => {
        state.user =
          payload.user;
        state.isLoading =
          false;
      },
      onLogOutUser:
        (state) => {
          state.user =
            [];
          state.activeTeam =
            null;
          state.userTeams =
            [];
        },
      onLoadingTeam:
        (state) => {
          state.isLoading =
            true;
        },
      cleanActiveTeam:
        (state) => {
          state.activeTeam =
            null;
          state.membersActiveTeam =
            [];
        },
      onSetUserTeams:
        (
          state,
          action: PayloadAction<{
            userTeams: UserTeams[];
          }>
        ) => {
          state.userTeams =
            action.payload.userTeams;
          state.isLoading =
            false;
        },
      onSetActiveTeam:
        (
          state,
          action: PayloadAction<{
            id: number;
          }>
        ) => {
          const userTeam =
            state.userTeams.find(
              (
                team
              ) =>
                team.id ===
                action
                  .payload
                  .id
            );
          state.activeTeam =
            userTeam;
          state.isLoading =
            false;
        },
      onSetActiveTeamMembers:
        (
          state,
          action: PayloadAction<{
            members: Members[];
          }>
        ) => {
          console.log(
            action
              .payload
              .members
          );

          state.membersActiveTeam =
            action.payload.members;
          state.isLoading =
            false;
        },
      onCreateTeam:
        (
          state,
          action: PayloadAction<{
            team: UserTeams;
          }>
        ) => {
          state.userTeams.push(
            action
              .payload
              .team
          );
          state.isLoading =
            false;
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
} =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
