import { FaRegUserCircle } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { useAuthSlice } from "../hooks/useAuthSlice";

export const NavBar = () => {
  const { startLogingOut } = useAuthSlice();
  return (
    <nav className='flex w-full bg-primary h-20  justify-around '>
      <div className='w-full flex justify-between items-center  '>
        <div className='flex ml-4'>
          <FaRegUserCircle className='text-tertiary h-14 w-14' />
          <span className='text-tertiary my-auto ml-4 font-poppins text-xl'>John Doe</span>
        </div>
        <div className=''>
          <span className='text-tertiary font-poppins mr-4 my-auto text-xl'>John Doe's Team 1</span>
          <span className='btn-primary rounded-lg p-2 font-poppins duration-700 hover:bg-tertiary hover:text-primary'>
            Members
          </span>
        </div>
        <div
          onClick={() => startLogingOut()}
          className='flex btn-secondary p-2 rounded-lg font-poppins mr-4 w-fit hover:bg-secondary hover:text-tertiary duration-700'
        >
          <button className=' '>Log Out</button>
          <RxExit className='font-thin ml-2  my-auto h-6 w-6' />
        </div>
      </div>
    </nav>
  );
};
