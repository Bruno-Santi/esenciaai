import { useDashboard } from "../../hooks/useDashboard";
import { RiLightbulbLine } from "react-icons/ri";
import { DashboardUi } from "./DashboardUi";

export const ActiveTeam = () => {
  const { activeTeam } = useDashboard();
  return (
    <div className='flex mx-auto justify-center my-auto h-full '>
      {!activeTeam ? (
        <div className='flex flex-col justify-center mx-auto my-72 space-y-2 duration-700 animate-pulse'>
          <div className='text-4xl font-poppins text-primary/80'>
            Select a team
          </div>
          <div className='mx-auto my-auto'>
            <RiLightbulbLine className='text-[100px] text-primary/80' />
          </div>
        </div>
      ) : (
        <DashboardUi />
      )}
    </div>
  );
};
