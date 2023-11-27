import { LayoutProps } from "../interface/index";
import { NavBar, SideBar } from "../components";

export const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <SideBar />
      <div>{children}</div>
    </div>
  );
};
