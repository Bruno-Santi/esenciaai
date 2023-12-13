import { useEffect } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { DashboardLayout } from "../../layaout/DashboardLayout";
import { ActiveTeam, NoTeams } from "../components";
import { useAuthSlice } from "../../hooks/useAuthSlice";

export const Main = () => {
  const { startSettingUser, startSettingTeams, userTeams } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      await startSettingUser();
      await startSettingTeams();
    };

    fetchData();
  }, []);

  return <DashboardLayout>{userTeams?.length ? <ActiveTeam /> : <NoTeams />}</DashboardLayout>;
};
