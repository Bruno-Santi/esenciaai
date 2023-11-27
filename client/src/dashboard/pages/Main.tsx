import { useMemo } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { DashboardLayout } from "../../layaout/DashboardLayout";

export const Main = () => {
  const { startLoadingTeams } = useDashboard();
  useMemo(() => {
    startLoadingTeams();
  }, []);

  return (
    <DashboardLayout>
      <div>holas</div>
    </DashboardLayout>
  );
};
