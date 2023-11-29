import React from "react";
import { TeamListProps } from "../interface/index";
import { useDashboard } from "../hooks/useDashboard";

export const TeamList: React.FC<TeamListProps> = ({ id, name, logo }) => {
  const { startSettingActiveTeam } = useDashboard();

  return (
    <div className='rounded-full w-fit justify-center' onClick={() => startSettingActiveTeam(id)} key={id}>
      <div className='object-cover rounded-full overflow-hidden'>
        <img
          src={logo}
          className='w-16  cursor-pointer overflow-hidden rounded-full duration-500 hover:scale-110 '
          alt={name}
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};
