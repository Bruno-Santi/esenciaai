import { video } from "../../assets";
import {
  useDocumentTitle,
  useNavigateTo,
} from "../../hooks";
import { OnBoardingLayout } from "../../layaout";

export const StepOne =
  () => {
    useDocumentTitle(
      "Onboard | Esencia.ai"
    );
    const {
      handleNavigate,
    } =
      useNavigateTo();
    return (
      <OnBoardingLayout>
        <div className="flex flex-col animate__animated animate__fadeIn animate__slower">
          <span className="w-2/6 font-light text-center font-manrope text-4xl text-tertiary mx-auto">
            Watch
            this
            short
            video to
            understand
            the
            magic of{" "}
            <span className="font-bold text-secondary">
              Esencia.ai
            </span>
            :
          </span>
          <div className="m-auto flex mt-20 bg-gray-400 w-3/6 h-60 rounded-xl">
            <img
              src={
                video
              }
              className="m-auto "
              alt="esencia onboarding video"
            />
          </div>
          <button
            onClick={() =>
              handleNavigate(
                "/onboarding/steptwo"
              )
            }
            className="btn-primary p-2 w-[200px] mx-auto mt-20 rounded-lg font-poppins text-lg duration-700 hover:bg-tertiary hover:text-primary"
          >
            Continue
          </button>
        </div>
      </OnBoardingLayout>
    );
  };
