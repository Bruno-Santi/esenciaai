import { Charts } from "./Charts";
import { LineCharts } from "./LineCharts";
import { useDashboard } from "../../hooks/useDashboard";
import { DataCollectionReport } from "./DataCollectionReport";
import { useNavigateTo } from "../../hooks";
import { useEffect } from "react";

export const DashboardUi = () => {
  const { startCreatingSurvey, linesMetrics, surveyLoading, activeTeam, metricsForToday } = useDashboard();
  const { handleNavigate } = useNavigateTo();
  useEffect(() => {
    console.log(linesMetrics);
  }, [linesMetrics]);

  return (
    <div className=' w-full grid px-6 ml-16  py-4 grid-cols-12 grid-rows-2 gap-6'>
      <div
        className='bg-tertiary shadow-lg
         shadow-primary/50  h-[400px]
      w-full col-span-6  rounded-md'
      >
        <span className='font-poppins text-primary flex mt-4 ml-4 text-2xl'>Key team indicator</span>
        <span className='font-poppins font-extralight ml-4 text-lg'>For the last 15 days</span>
        <div className='flex items-center justify-center h-3/6'>
          <span className='text-center font-poppins w-4/12 mt-20 text-primary/50 font-bold text-4xl'>
            <div className='flex justify-center -space-x-20 m-auto text-center'></div>
            {Object.keys(metricsForToday).length > 0 ? (
              <Charts />
            ) : (
              <p className='text-2xl'>NO DATA YET, TRY MAKING ACTIONS</p>
            )}
          </span>
        </div>
      </div>

      <div
        className='bg-quaternary shadow-lg
         shadow-primary/50  h-[400px]
      w-full col-span-3  rounded-md'
      >
        <span className='font-poppins text-tertiary w-1/6 text-3xl ml-4 mt-4 flex'>Actionable Insights</span>
        <div className='bg-tertiary w-2/3 mt-6 h-3/6 mx-auto rounded-lg'></div>
        <button className='btn-primary text-xl w-fit p-2 rounded-md font-poppins mx-auto flex duration-700 hover:bg-tertiary hover:text-primary mt-6'>
          Generate
        </button>
      </div>
      <div
        className='bg-tertiary shadow-lg
         shadow-primary/50  h-[400px]
      w-full col-span-3  rounded-md'
      >
        <div className='flex flex-col space-y-8 p-2 m-auto'>
          <span className='font-poppins text-primary flex mt-4 ml-4 text-2xl'>Avaible Actions</span>
          <button
            disabled={surveyLoading}
            onClick={() => startCreatingSurvey(activeTeam.name, activeTeam.id)}
            className={
              !surveyLoading
                ? "btn-primary font-poppins text-xl rounded-md p-2 duration-700 hover:bg-amber-100 hover:text-primary"
                : "btn-secondary font-poppins text-xl rounded-md p-2 duration-700 "
            }
          >
            Pulse Survey
          </button>
          <button
            onClick={() => handleNavigate("/dashboard/retro")}
            className='btn-primary font-poppins text-xl rounded-md p-2 duration-700 hover:bg-amber-100 hover:text-primary'
          >
            Retrospectives
          </button>
          <button
            className='btn-primary 
          font-poppins text-base rounded-md p-2 duration-700
           hover:bg-amber-100 hover:text-primary'
          >
            Feedback and Recognition
          </button>
          <button
            className='btn-primary font-poppins text-xl rounded-md
           p-2 duration-700 hover:bg-amber-100
            hover:text-primary'
          >
            Reports
          </button>
        </div>
      </div>

      <div
        className='bg-tertiary shadow-lg
         shadow-primary/50  h-[400px]
      w-full col-span-4 row-span-2  rounded-md'
      >
        <span className='font-poppins text-primary flex mt-4 ml-4 text-2xl'>Data collection report</span>

        <div className='flex items-center justify-center h-3/6'>
          <span className='text-center mt-28 font-poppins w-3/6 text-primary/50 font-bold text-4xl'>
            <DataCollectionReport />
          </span>
        </div>
      </div>

      <div
        className='bg-tertiary shadow-lg
         shadow-primary/50  h-[400px]
      w-full col-span-8 row-span-2  rounded-md'
      >
        <span className='font-poppins text-primary flex mt-4 ml-4 text-2xl'>Team global report</span>
        <div className='flex items-center justify-center h-3/6'>
          <span className='text-center mt-28 font-poppins w-3/6 text-primary/50 font-bold text-4xl'>
            {Object.keys(linesMetrics).length > 0 ? (
              <LineCharts />
            ) : (
              <p className='text-2xl'>NO DATA YET, TRY MAKING ACTIONS</p>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
