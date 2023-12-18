import React from "react";
import { TeamListProps } from "../../interface/index";
import { useDashboard } from "../../hooks/useDashboard";

export const TeamList: React.FC<TeamListProps> = ({ id, name, logo }) => {
  const { startSettingActiveTeam, activeTeam, closeModal } = useDashboard();
  const isActive = activeTeam?.id === id;
  return (
    <div
      className={
        isActive
          ? "rounded-full opacity-100 w-fit my-auto -mx-2 justify-center border-2 border-secondary"
          : "rounded-full w-fit opacity-100 -mx-2  justify-center"
      }
      onClick={() => {
        startSettingActiveTeam(id);
      }}
      key={id}
    >
      <div className='object-cover rounded-full overflow-hidden'>
        <img
          src={logo}
          className={
            isActive
              ? " w-12 h-12 cursor-pointer opacity-100 overflow-hidden rounded-full duration-500 hover:opacity-100  "
              : " w-12 h-12 cursor-pointer opacity-60  overflow-hidden rounded-full duration-500 hover:opacity-100  "
          }
          alt={name}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};
