import { useRef, useState } from "react";
import { OnBoardingLayout } from "../../layaout";
import { MdUploadFile } from "react-icons/md";
import { useDocumentTitle, useImageUpload, useNavigateTo } from "../../hooks";
import { useDashboard } from "../../hooks/useDashboard";

export const StepTwo = () => {
  useDocumentTitle("Onboard | Esencia.ai");
  const [teamName, setTeamName] = useState("");
  const fileInputRef = useRef(null);
  const { imageSelected, handleImageClick, handleFileChange, isLoading } =
    useImageUpload(fileInputRef);
  const { handleNavigate } = useNavigateTo();
  const { startCreatingTeam } = useDashboard();
  const handleChange = (e) => {
    const { value } = e.target;
    setTeamName(value);
  };
  const handleSubmit = () => {
    const team = {
      logo:
        imageSelected ||
        "https://res.cloudinary.com/di92lsbym/image/upload/c_thumb,w_200,g_face/v1701895638/team-logo_2_fq5yev.png",
      name: teamName,
    };
    startCreatingTeam(team);
    handleNavigate("/dashboard");
  };
  return (
    <OnBoardingLayout>
      <div className='flex flex-col animate__animated animate__fadeIn animate__slower'>
        <span className='w-2/6 font-light text-center font-manrope text-4xl text-tertiary mx-auto'>
          Great! Now, let's set the stage for your team. What's your{" "}
          <span className='font-bold text-secondary'>team name</span>?
          <div className='flex flex-col mt-12'>
            <label htmlFor='teamName' className='text-manrope text-2xl '>
              Your team name
            </label>
            <input
              onChange={handleChange}
              value={teamName}
              className='h-12 mt-4 m-auto w-64 rounded-md p-2 text-sm font-thin  border-2 duration-500 text-primary focus:outline-none focus:border-2 focus:border-secondary/80 focus:font-bold'
              type='text'
            ></input>
            <label htmlFor='teamLogo' className='text-manrope text-2xl mt-4 '>
              Your team logo
            </label>
            <input
              type='file'
              name='teamLogo'
              ref={fileInputRef}
              style={{
                display: "none",
              }}
              onChange={handleFileChange}
            />
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
              <MdUploadFile
                className='w-32 h-32 cursor-pointer m-auto mt-4 text-tertiary duration-700 hover:text-secondary'
                onClick={handleImageClick}
              />
            )}
          </div>
        </span>
        <div className='flex w-2/6 m-auto'>
          <button
            onClick={() => {
              localStorage.setItem("firstLoggin", "1");
              handleNavigate("/dashboard");
            }}
            disabled={isLoading}
            className={
              isLoading
                ? "btn-disabled p-2 w-[200px] mx-auto mt-20 rounded-lg font-poppins text-lg "
                : "btn-secondary p-2 w-[200px] mx-auto mt-20 rounded-lg font-poppins text-lg duration-700 hover:bg-tertiary hover:text-primary"
            }
          >
            Skip for now
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !teamName.length}
            className={
              isLoading
                ? "btn-disabled p-2 w-[200px] mx-auto mt-20 rounded-lg font-poppins text-lg "
                : "btn-primary p-2 w-[200px] mx-auto mt-20 rounded-lg font-poppins text-lg duration-700 hover:bg-tertiary hover:text-primary"
            }
          >
            Continue
          </button>
        </div>
      </div>
    </OnBoardingLayout>
  );
};
