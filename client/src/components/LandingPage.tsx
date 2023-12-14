import { Divider } from ".";
import logo from "../assets/logo.png";
import { useNavigateTo } from "../hooks";

export const LandingPage = () => {
  const { handleNavigate } = useNavigateTo();
  return (
    <div
      className='bg-primary h-screen lg:h-screen
     w-full '
    >
      <div className='flex flex-col  my-auto place-content-center items-center  justify-center pt-12 lg:p-20 space-y-6 lg:space-y-8 animate__animated animate__fadeIn animate__slower '>
        <img src={logo} className=' w-1/6 lg:w-[129px] m-auto animate-pulse duration-700' alt='esencia.ai logo' />
        <span className='text-tertiary/40 text-lg lg:text-2xl  font-poppins font-bold italic m-auto'>
          By Agile Leaders for Agile Leaders
        </span>
        <Divider />
        <h1 className='font-manrope  font-bold text-tertiary w-5/6 lg:w-4/6 text-3xl md:text-3xl lg:text-4xl text-center m-auto'>
          Dive into our vision of <span className='text-secondary leading-3'>revolutionizing</span> Agile Leadership.{" "}
        </h1>
        <p className='w-10/12 lg:w-6/12 text-center text-tertiary m-auto font-thin text-lg lg:text-xl'>
          At the heart of our mission is the drive to{" "}
          <span className='font-bold text-secondary'>elevate your leadership</span> skills to unprecedented heights,
          transcending traditional boundaries.
        </p>
        <p className='w-10/12  lg:w-6/12 text-center text-tertiary m-auto font-thin text-lg lg:text-xl'>
          As we're in the early stages of bringing <span className='font-bold text-secondary'>Esencia.ai</span> to life,
          <span className='font-bold text-secondary'> we welcome your insights and suggestions</span> to shape this
          platform perfectly for its intended users, leaders like you.
        </p>
        <p className='w-10/12 lg:w-6/12 text-center text-tertiary m-auto font-thin text-lg lg:text-xl'>
          <span className='font-bold text-secondary'>Join us</span> on this journey of creation and discovery!
        </p>
        <div
          onClick={() => handleNavigate("/auth/login")}
          className='btn-primary m-auto p-2 lg:p-4 rounded-md font-poppins w-28 text-center text-lg lg:text-2xl duration-500 hover:bg-tertiary hover:text-secondary'
        >
          Dive In
        </div>
      </div>
    </div>
  );
};
