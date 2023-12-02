import { useForm } from "react-hook-form";
import { Modal } from "../layaout";
import React from "react";
import { toast } from "react-toastify";

export const AddMemberModal: React.FC<{
  closeAddMember(): void;
}> = ({
  closeAddMember,
}) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm();
  const onSubmit = (
    data
  ) => {
    toast.success(
      `${data.name} added to the team`,
      {
        position:
          "bottom-center",
        autoClose: 5000,
        hideProgressBar:
          false,
        closeOnClick:
          true,
        pauseOnHover:
          true,
        draggable:
          true,
        progress:
          undefined,
        theme:
          "dark",
      }
    );
    closeAddMember();
  };

  return (
    <Modal>
      <form className="flex flex-col w-4/6 mx-auto font-poppins text-xl">
        <div className="my-6 flex flex-col mx-auto">
          <label htmlFor="name">
            Name
          </label>

          <input
            className="h-12 w-64 rounded-md p-2 text-sm font-normal  border-2 duration-500 text-primary focus:outline-none focus:border-2 focus:border-secondary/80 focus:font-bold"
            type="text"
            placeholder="Name"
            {...register(
              "name",
              {
                required:
                  true,
                maxLength: 20,
              }
            )}
          />
        </div>
        <div className="my-6 flex flex-col mx-auto">
          <label htmlFor="email">
            Email:
          </label>
          <input
            className="h-12 w-64 rounded-md p-2 text-sm font-normal  border-2 duration-500 text-primary focus:outline-none focus:border-2 focus:border-secondary/80 focus:font-bold"
            type="email"
            placeholder="Email"
            {...register(
              "email",
              {
                required:
                  true,
              }
            )}
          />
        </div>
      </form>
      <div className="flex space-x-6 mx-auto justify-center ">
        <button
          onClick={
            closeAddMember
          }
          className="btn-secondary rounded-md p-2 font-poppins duration-700 hover:bg-tertiary hover:text-primary "
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit(
            onSubmit
          )}
          className="btn-primary rounded-md p-2 font-poppins duration-700 hover:bg-tertiary hover:text-primary "
        >
          Save
        </button>
      </div>
    </Modal>
  );
};
