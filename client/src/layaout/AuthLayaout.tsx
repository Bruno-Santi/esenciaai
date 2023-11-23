import authbg from "../assets/auth-bg.png";
import { Divider } from "../components";
import logo from "../assets/Logo.png";
export const AuthLayout = ({ children }) => {
  return (
    <section className='w-full h-screen bg-primary'>
      <div className='flex'>
        <div className='w-1/2'>
          <section className='w-5/6 flex flex-col  text-center justify-center m-auto pt-20'>
            <h1 className='text-tertiary font-manrope font-bold text-6xl'>
              Discover a new way to empower your <span className='text-secondary'>agile teams</span>
            </h1>
            <div className='w-5/6 m-auto space-y-6 pt-20'>
              <p className='text-tertiary font-light text-2xl'>
                <span className='importantWord'>Esencia</span> is the innovative SaaS platform designed to take your
                Agile Leadership to the next level.
              </p>
              <p className='text-tertiary font-light text-2xl'>
                Break the barrier of process-focused tools and discover an <br></br>
                <span className='importantWord'>AI-powered </span>solution that enhances your leadership to improve
                culture, emotions, and interactions within your teams.
              </p>
              <div className='pt-40'>
                {" "}
                <Divider width={"w-[200px]"} />
              </div>
            </div>
            <span className='text-tertiary/40 text-lg lg:text-2xl font-poppins font-bold italic pt-20'>
              By Agile Leaders for Agile Leaders
            </span>
          </section>
        </div>
        <div className='w-1/2 h-screen relative'>
          <div className='fixed top-1/2 transform -translate-y-1/2 right-40 w-2/6 bg-primary/60 h-3/4 z-50 rounded-xl'>
            <img src={logo} alt='esencia logo' className='animate-pulse w-24 mt-14 m-auto' />
            <div className='flex m-auto justify-center'>{children}</div>
          </div>
          <img src={authbg} alt='' className='object-cover w-full h-full opacity-80' />
        </div>
      </div>
    </section>
  );
};
