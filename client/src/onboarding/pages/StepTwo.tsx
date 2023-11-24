import { useRef } from "react";
import { OnBoardingLayout } from "../../layaout";
import { MdUploadFile } from "react-icons/md";
import { useImageUpload } from "../../hooks";

export const StepTwo = () => {
  const fileInputRef = useRef(null);
  const { imageSelected, handleImageClick, handleFileChange } = useImageUpload(fileInputRef);

  return (
    <OnBoardingLayout>
      <div className='flex flex-col animate__animated animate__fadeIn animate__slower'>
        <span className='w-2/6 font-light text-center font-manrope text-4xl text-tertiary mx-auto'>
          Great! Now, let's set the stage for your team. What’s your{" "}
          <span className='font-bold text-secondary'>team name</span>?
          <div className='flex flex-col mt-12'>
            <label htmlFor='teamName' className='text-manrope text-2xl '>
              Your team name
            </label>
            <input
              className='h-12 mt-4 m-auto w-64 rounded-md p-2 text-sm font-thin  border-2 duration-500 text-primary focus:outline-none focus:border-2 focus:border-secondary/80 focus:font-bold'
              type='text'
            ></input>
            <label htmlFor='teamName' className='text-manrope text-2xl mt-4 '>
              Your team logo
            </label>
            <input type='file' ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
            {imageSelected ? (
              <div className='w-32 h-32 m-auto mt-4'>
                <img
                  src={imageSelected}
                  onClick={handleImageClick}
                  alt='Team Logo'
                  className='object-cover w-full h-full cursor-pointer rounded-full border-2 p-2 border-secondary/80'
                />
              </div>
            ) : (
              <MdUploadFile className='w-32 h-32 cursor-pointer m-auto mt-4 text-tertiary' onClick={handleImageClick} />
            )}
          </div>
        </span>
        <div className='flex w-2/6 m-auto'>
          <button className='btn-secondary p-2 w-[200px] mx-auto mt-20 rounded-lg font-poppins text-lg duration-700 hover:bg-secondary hover:text-tertiary '>
            Skip for now
          </button>
          <button className='btn-primary p-2 w-[200px] mx-auto mt-20 rounded-lg font-poppins text-lg duration-700 hover:bg-tertiary hover:text-primary'>
            Continue
          </button>
        </div>
      </div>
    </OnBoardingLayout>
  );
};
