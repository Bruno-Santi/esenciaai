import { Charts } from "./Charts";
import { LineCharts } from "./LineCharts";
import { useDashboard } from "../../hooks/useDashboard";
import { DataCollectionReport } from "./DataCollectionReport";
import { useNavigateTo } from "../../hooks";
import { toastSuccess, toastWarning } from "../../helpers";
import { IoRefreshCircleOutline } from "react-icons/io5";

import { useRef } from "react";
import { UsePagination } from "../../hooks/usePagination";

export const DashboardUi = () => {
  const {
    startCreatingSurvey,
    startCreatingRetro,
    linesMetrics,
    surveyLoading,
    activeTeam,
    metricsForToday,
    shortRecomendation,
    modalOpen,
    buttonGetData,
    dataLoading,
  } = useDashboard();
  const { handleNavigate } = useNavigateTo();
  const containerRef = useRef();
  const handleSendRetro = async (teamId) => {
    try {
      const resp = await startCreatingRetro(teamId);
      toastSuccess("Retro created successfully. Redirecting");

      setTimeout(() => {
        const url = `https://finstory.github.io/esencia_retro/?team_id=${teamId}&access=23e23fd32F`;
        window.open(url, "_blank");
      }, 3000);
    } catch (error) {
      toastWarning("Error creating retro");
    }
  };

  if (dataLoading) return <h2>cargando</h2>;
  return (
    <>
      <div className=' w-full md:grid lg:grid px-6 ml-16 sm:flex sm:flex-col  lg:py-6 md:py-20 grid-cols-12 grid-rows-2 gap-6'>
        <div
          className='bg-tertiary shadow-lg
         shadow-primary/50  h-[400px]
      w-full lg:col-span-6 md:col-span-8   rounded-md'
        >
          <span className='font-poppins text-primary flex mt-4 ml-4 text-2xl'>Key team indicator</span>
          <span className='font-poppins font-extralight ml-4 text-lg'>For the last 15 days</span>
          <div className='flex items-center justify-center h-3/6'>
            <span className='text-center font-poppins w-4/12 mt-20 text-primary/50 font-bold text-4xl'>
              <div className='flex justify-center -space-x-20 m-auto text-center'></div>
              {Object.keys(metricsForToday).length > 0 ? (
                <div className={!modalOpen ? "hidden" : ""}>
                  <Charts />
                </div>
              ) : (
                <p className='text-2xl'>NO DATA YET, TRY MAKING ACTIONS</p>
              )}
            </span>
          </div>
        </div>

        <div
          className='bg-quaternary shadow-lg
         shadow-primary/50  h-[400px]
      w-full lg:col-span-3 md:col-span-4  rounded-md'
        >
          <span className='font-poppins text-tertiary w-full text-2xl ml-4 mt-4 flex'>Actionable Insights</span>
          <div ref={containerRef} className='bg-tertiary w-5/6 mt-4 h-4/6 mx-auto rounded-lg overflow-y-scroll'>
            <div
              ref={containerRef}
              className='font-poppin p-3 w-6/6  scroll-p-12 overflow-x-hidden bg-tertiary  m-auto'
            >
              {Object.keys(shortRecomendation).length > 0 ? (
                <UsePagination shortRecomendation={shortRecomendation} containerRef={containerRef} />
              ) : (
                <p className='text-center justify-center my-auto items-center font-poppins font-bold text-primary/50'>
                  NO DATA YET, TRY TO MAKING A SURVEY FIRST
                </p>
              )}
            </div>
          </div>
          <div className='mx-auto flex justify-center mt-2'>
            <button
              onClick={() => buttonGetData(activeTeam.id, true)}
              className='btn-primary flex p-2 text-lg rounded-lg hover:text-primary hover:bg-tertiary duration-700'
            >
              Refresh Data{" "}
              <i className='my-auto text-xl ml-2'>
                {" "}
                <IoRefreshCircleOutline />
              </i>
            </button>
          </div>
        </div>
        <div
          className='bg-tertiary shadow-lg
         shadow-primary/50  h-[400px]
      w-full col-span-4 md:col-span-3 md:row-span-2 lg:row-span-1 rounded-md'
        >
          <div className='flex flex-col space-y-8 p-2 m-auto md:col-span-3 '>
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
              onClick={() => handleSendRetro(activeTeam.id)}
              className='btn-primary font-poppins text-xl rounded-md p-2 duration-700 hover:bg-amber-100 hover:text-primary'
            >
              Retrospectives
            </button>
            <button
              className='btn-primary 
          font-poppins text-base rounded-md p-2 duration-700
           hover:bg-amber-100 hover:text-primary'
              onClick={() => handleNavigate("/dashboard/feedback")}
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
      w-full lg:col-span-4 md:col-span-3 row-span-2 rounded-md'
        >
          <span className='font-poppins text-primary flex mt-4 ml-4 md:text-lg text-2xl'>Data collection report</span>

          <div className='flex ml-10 items-center font-extralight justify-start h-3/6'>
            <span className='text-center mt-28 font-bold font-poppins w-5/6 text-primary/50 md:text-lg text-4xl'>
              <DataCollectionReport />
            </span>
          </div>
        </div>

        <div
          className='bg-tertiary shadow-lg
         shadow-primary/50  h-[400px]
      w-full lg:col-span-8 md:col-span-6 row-span-2  rounded-md'
        >
          <span className='font-poppins text-primary flex mt-4 ml-4 text-2xl'>Team global report</span>
          <div className='flex items-center m-auto justify-center h-3/6'>
            <span className='text-center mt-28 font-poppins w-full text-primary/50 font-bold text-4xl'>
              {Object.keys(linesMetrics).length > 0 ? (
                <LineCharts />
              ) : (
                <p className='text-2xl'>NO DATA YET, TRY MAKING ACTIONS</p>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
