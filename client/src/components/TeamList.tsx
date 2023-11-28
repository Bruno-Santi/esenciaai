import React from "react";
import { TeamListProps } from "../interface/index";

export const TeamList: React.FC<TeamListProps> = ({ id, name, logo }) => {
  return (
    <div className='rounded-full w-fit justify-center' key={id}>
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
