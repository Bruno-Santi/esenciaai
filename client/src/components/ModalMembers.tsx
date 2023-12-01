import { IoMdClose } from "react-icons/io";
import { Modal } from "../layaout";
import { TeamForm } from ".";
import React from "react";
import { useDashboard } from "../hooks/useDashboard";

export const ModalMembers: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const { membersActiveTeam } = useDashboard();
  return (
    <Modal>
      <div
        className='text-5xl text-primary/60 cursor-pointer absolute right-4 top-4 duration-700 hover:text-secondary '
        onClick={closeModal}
      >
        <IoMdClose />
      </div>
      <div className='flex flex-col'>
        <div>asfdasfas</div>
        {membersActiveTeam?.map((member) => {
          return (
            <div className='flex odd:bg-gray-500 w-full space-x-2 p-6'>
              <p>{member.name}</p>
              <p>{member.email}</p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
