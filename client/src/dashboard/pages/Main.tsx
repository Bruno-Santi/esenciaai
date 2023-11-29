import { useMemo } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { DashboardLayout } from "../../layaout/DashboardLayout";
import { ActiveTeam, NoTeams } from "../../components";

export const Main = () => {
  const { startSettingUser, userTeams } = useDashboard();
  useMemo(() => {
    startSettingUser();
  }, []);

  return <DashboardLayout>{userTeams.length ? <ActiveTeam /> : <NoTeams />}</DashboardLayout>;
};
