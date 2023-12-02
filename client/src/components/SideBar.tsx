import { CiCirclePlus } from "react-icons/ci";
import { Teams } from "./Teams";
import { useModal } from "../hooks";
import { ModalTeam } from "./ModalTeam";

export const SideBar = () => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div className='static'>
      <section className='fixed top-0 left-0 w-16 bg-quaternary h-full '>
        <div className='flex flex-col h-full'>
          <span className='text-tertiary font-poppins text-md mx-auto mt-4'>
            Teams
          </span>
          <div className='w-40 justify-center '>
            <Teams />
          </div>
          <CiCirclePlus
            onClick={() => openModal("createTeam")}
            className='text-tertiary w-12 h-12 mx-auto fixed left-2 bottom-5 cursor-pointer hover:text-secondary duration-700'
          />
          <div>{isOpen && <ModalTeam closeModal={closeModal} />}</div>
        </div>
      </section>
    </div>
  );
};
