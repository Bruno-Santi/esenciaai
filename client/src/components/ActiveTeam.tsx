import { useDashboard } from "../hooks/useDashboard";
import { TbBulb } from "react-icons/tb";
import { RiLightbulbLine } from "react-icons/ri";

export const ActiveTeam = () => {
  const { activeTeam } = useDashboard();
  return (
    <div className='flex mx-auto justify-center my-auto h-full'>
      {!activeTeam ? (
        <div className='flex flex-col justify-center mx-auto my-60 space-y-6'>
          <div className='text-6xl font-poppins text-primary/70'>Select a team</div>
          <div className='mx-auto my-auto'>
            <RiLightbulbLine className='text-[200px] text-primary/70' />
          </div>
        </div>
      ) : (
        <div>si hay team</div>
      )}
    </div>
  );
};
