import { useDocumentTitle, useNavigateTo } from "../../hooks";
import { OnBoardingLayout } from "../../layaout";

export const Welcome = () => {
  useDocumentTitle("Onboard | Esencia.ai");
  const { handleNavigate } = useNavigateTo();
  return (
    <OnBoardingLayout>
      <div className='flex flex-col justify-center w-2/6 m-auto animate__animated animate__fadeIn animate__slower'>
        <div className='text-center'>
          <span className='w-2/3 font-bold text-center font-manrope text-6xl text-tertiary mx-auto'>
            Welcome aboard, <span className='text-secondary'>John Doe!</span>
          </span>
        </div>
        <span className='font-poppins font-light text-tertiary text-2xl text-center w-2/3 mx-auto mt-20'>
          Just a few steps left before you dive into the world of Agile Leadership with{" "}
          <span className='text-secondary'>Esencia.ai</span>.
        </span>
        <button
          onClick={() => handleNavigate("/onboarding/stepone")}
          className='btn-primary p-2 w-2/6 mx-auto mt-20 rounded-lg font-poppins text-lg duration-700 hover:bg-tertiary hover:text-primary'
        >
          Continue
        </button>
      </div>
    </OnBoardingLayout>
  );
};
