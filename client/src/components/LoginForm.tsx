import { useForm } from "react-hook-form";
import { Divider } from "./";
import { useAuthSlice } from "../hooks/useAuthSlice";
import { useNavigateTo } from "../hooks";

export const LoginForm = () => {
  const { startCheckingUser, loading, errorMessage } = useAuthSlice();
  const { handleNavigate } = useNavigateTo();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: string[]): void => {
    console.log(data, loading);
    startCheckingUser(data);
  };

  console.log(errors);
  return (
    <>
      <form className='flex flex-col space-y-6 pt-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col'>
          <label className=' text-tertiary text-lg font-normal' htmlFor='email'>
            Email
          </label>
          <input
            type='email'
            className='h-12 w-64 rounded-md p-2 text-sm font-thin  border-2 duration-500 text-primary focus:outline-none focus:border-2 focus:border-secondary/80 focus:font-bold'
            placeholder='Email'
            {...register("Email", {
              required: "This field is required",
              min: 5,
              maxLength: 30,
            })}
          />
          {errors.Email && <span className='text-lg m-auto text-red-500 font-normal'>{errors.Email.message}</span>}
        </div>
        <div className='flex flex-col'>
          <label className=' text-tertiary text-lg font-normal' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            className='h-12 w-64 rounded-md p-2 text-sm font-thin  border-2 duration-500 text-primary focus:outline-none focus:border-2 focus:border-secondary/80 focus:font-bold'
            placeholder='Password'
            {...register("Password", {
              required: "This field is required",
              maxLength: {
                value: 30,
                message: "La contraseña no puede tener más de 30 caracteres",
              },
            })}
          />
          {errors.Password && (
            <span className='text-lg m-auto text-red-500 font-normal'>{errors.Password.message}</span>
          )}
        </div>
        <button
          type='submit'
          disabled={loading}
          className={
            loading
              ? "btn-disabled  p-2 rounded-lg font-poppins text-lg"
              : "btn-primary p-2 rounded-lg font-poppins text-lg duration-700 hover:bg-tertiary hover:text-primary"
          }
        >
          Log In
        </button>
        {errorMessage && <p className='font-poppins text-red-500 m-auto'>{errorMessage}</p>}
      </form>
      <span className='text-tertiary font-normal mt-6 font-poppins cursor-pointer text-lg m-auto  duration-500 hover:text-secondary '>
        Forgot password?
      </span>
      <div className='pt-10'>
        <Divider width={"w-[400px]"} />
      </div>
      <span
        onClick={() => handleNavigate("/auth/register")}
        className='text-tertiary font-normal mt-10 font-poppins cursor-pointer text-lg m-auto  duration-500 hover:text-secondary '
      >
        New at esencia? <span>Register</span>
      </span>
    </>
  );
};
