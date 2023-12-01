import { FaRegUserCircle } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { useAuthSlice } from "../hooks/useAuthSlice";
import { useDashboard } from "../hooks/useDashboard";
import { useModal } from "../hooks";
import { ModalMembers } from "./ModalMembers";

export const NavBar = () => {
  const { startLogingOut } = useAuthSlice();
  const { activeTeam, user, startSettingActiveMembers } = useDashboard();
  const { isOpen, closeModal, openModal } = useModal();
  return (
    <nav className='flex w-full bg-primary h-16  justify-around '>
      <div className='w-full flex justify-between items-center  '>
        <div className='flex ml-4'>
          <FaRegUserCircle className='text-tertiary h-12 w-12 -mx-2 mr-1' />
          <span className='text-tertiary my-auto ml-4 font-poppins text-lg'>
            {user.name} {user.lastName}
          </span>
        </div>
        {activeTeam && (
          <div className=''>
            <span className='text-tertiary font-poppins mr-4 my-auto text-lg'>{activeTeam.name}</span>
            <span
              onClick={() => {
                openModal();
                startSettingActiveMembers(activeTeam.id);
              }}
              className='btn-primary rounded-lg p-2 text-lg font-poppins duration-700 hover:bg-tertiary hover:text-primary'
            >
              Members
            </span>
          </div>
        )}
        <div
          onClick={() => startLogingOut()}
          className='flex btn-secondary p-2 rounded-lg font-poppins mr-4 w-fit hover:bg-secondary hover:text-tertiary duration-700'
        >
          <button className='text-md '>Log Out</button>
          <RxExit className='font-thin ml-2  my-auto h-4 w-4' />
        </div>
      </div>
      {isOpen && <ModalMembers closeModal={closeModal} />}
    </nav>
  );
};
