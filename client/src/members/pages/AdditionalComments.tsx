import { ChangeEvent, SyntheticEvent, useState } from "react";
import { SurveyLayout } from "../../layaout";

export const AdditionalComments = () => {
  const [comment, setComment] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setComment(value);
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(comment);
  };
  return (
    <SurveyLayout>
      <div className='w-4/6 m-auto flex flex-col mt-12 h-3/6 bg-gray-600 rounded-md text-tertiary font-poppins'>
        <span className='m-auto mt-16 text-2xl'>
          Would you like to leave any additional comments?
        </span>
        <textarea
          onChange={handleChange}
          placeholder='Put any comment here...'
          className='bg-white rounded-md w-5/6 h-1/3 p-4 flex m-auto text-primary'
        ></textarea>
        <div className='flex w-1/3 m-auto'>
          <button className='btn-secondary mb-12 p-2 w-[150px] rounded-md m-auto'>
            Skip
          </button>
          <button
            disabled={!comment}
            className={
              comment
                ? "btn-primary mb-12 p-2 w-[150px] rounded-md m-auto"
                : "btn-secondary mb-12 p-2 w-[150px] rounded-md m-auto"
            }
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </div>
    </SurveyLayout>
  );
};
