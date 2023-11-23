import { useForm } from "react-hook-form";
import { Divider } from "./";
import { useAuthSlice } from "../hooks/useAuthSlice";

export const LoginForm = () => {
  const { startCheckingUser } = useAuthSlice();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    startCheckingUser(data);
  };

  console.log(errors);
  return (
    <>
      <form className='flex flex-col space-y-6 pt-16' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col'>
          <label className=' text-tertiary text-lg font-normal' htmlFor='email'>
            Email
          </label>
          <input
            type='email'
            className='h-12 w-64 rounded-md p-2 text-sm font-thin text-tertiary border-2 duration-500  focus:outline-none focus:border-2 focus:border-secondary/80'
            placeholder='Email'
            {...register("Email", {
              required: true,
              min: 5,
              maxLength: 30,
            })}
          />
        </div>
        <div className='flex flex-col'>
          <label className=' text-tertiary text-lg font-normal' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            className='h-12 w-64 rounded-md p-2 text-sm font-thin text-tertiary border-2 duration-500  focus:outline-none focus:border-2 focus:border-secondary/80'
            placeholder='Password'
            {...register("Password", {
              maxLength: {
                value: 30,
                message: "La contraseña no puede tener más de 30 caracteres",
              },
            })}
          />
        </div>
        <button
          type='submit'
          className='btn-primary p-2 rounded-lg font-poppins text-lg duration-700 hover:bg-tertiary hover:text-primary'
        >
          Log In
        </button>
      </form>
      <span className='text-tertiary font-normal mt-6 font-poppins cursor-pointer text-lg m-auto  duration-500 hover:text-secondary '>
        Forgot password?
      </span>
      <div className='pt-10'>
        <Divider width={"w-[400px]"} />
      </div>
      <span className='text-tertiary font-normal mt-10 font-poppins cursor-pointer text-lg m-auto  duration-500 hover:text-secondary '>
        New at esencia? <span>Register</span>
      </span>
    </>
  );
};
