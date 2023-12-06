import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyLayout } from "../../layaout";
import { useLocation } from "react-router-dom";

export const AdditionalComments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const finalBody = location.state?.finalBody || {};
  const [comment, setComment] = useState<string>(finalBody.comment || "");
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return (event.returnValue = "Are you sure you want to leave?");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    console.log("Received finalBody:", finalBody);
  }, [finalBody]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const updatedFinalBody = {
      ...finalBody,
      comment: comment,
    };
    navigate("/members/finished");
    console.log(updatedFinalBody);
  };
  return (
    <SurveyLayout>
      <div className='w-4/6 m-auto flex flex-col mt-12 h-3/6 bg-gray-600 rounded-md text-tertiary font-poppins'>
        <span className='m-auto mt-16 text-2xl'>
          Would you like to leave any additional comments?
        </span>
        <textarea
          onChange={handleCommentChange}
          placeholder='Put any comment here...'
          className='bg-white rounded-md w-5/6 h-1/3 p-4 flex m-auto text-primary'
        ></textarea>
        <div className='flex w-1/3 m-auto'>
          <button className='btn-secondary mb-12 p-2 w-[150px] rounded-md m-auto'>
            Skip
          </button>
          <button
            disabled={!comment}
            onClick={handleSubmit}
            className={
              comment
                ? "btn-primary mb-12 p-2 w-[150px] rounded-md m-auto"
                : "btn-secondary mb-12 p-2 w-[150px] rounded-md m-auto"
            }
          >
            Continue
          </button>
        </div>
      </div>
    </SurveyLayout>
  );
};
