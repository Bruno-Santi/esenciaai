import React from "react";
import { OnBoardingLayout } from "../../layaout";

export const StepOne = () => {
  return (
    <OnBoardingLayout>
      <div className='flex flex-col animate__animated animate__fadeIn animate__slower'>
        <span className='w-2/6 font-light text-center font-manrope text-4xl text-tertiary mx-auto'>
          Watch this short video to understand the magic of <span className='font-bold text-secondary'>Esencia.ai</span>
          :
        </span>
      </div>
    </OnBoardingLayout>
  );
};
