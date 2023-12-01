import { IoMdClose } from "react-icons/io";
import { Modal } from "../layaout";
import { TeamForm } from ".";
import React from "react";

export const ModalTeam: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  return (
    <Modal>
      <div
        className='text-5xl text-primary/60 cursor-pointer absolute right-4 top-4 duration-700 hover:text-secondary '
        onClick={closeModal}
      >
        <IoMdClose />
      </div>
      <div className='flex flex-col'>
        <TeamForm closeModal={closeModal} />
      </div>
    </Modal>
  );
};
