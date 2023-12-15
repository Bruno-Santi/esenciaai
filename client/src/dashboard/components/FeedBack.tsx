import { BackButton } from ".";
import { arrowdown, graph } from "../../assets";
import { useDocumentTitle } from "../../hooks";
import { DashboardLayout } from "../../layaout/DashboardLayout";

export const FeedBack = () => {
  useDocumentTitle("Feedback | Esencia.app");

  return (
    <DashboardLayout>
      <BackButton />
      <div className='flex h-screen'>
        <section className='flex flex-col w-2/3 justify-center my-auto place-content-center items-center ml-36 space-y-24 mt-28'>
          <div>
            <h2 className='font-manrope text-2xl mb-6'>Insight Analysis</h2>
            <div className='p-12 text-primary rounded-lg bg-gray-200 shadow-gray-700 shadow-lg font-poppins overflow-y-scroll'>
              Over the past month, the emotional pulse of your team has shown a consistent decline. Feedback mechanisms
              indicate increased reports of burnout, disengagement, and a concerns about team cohesion. Additionally,
              recent retrospective sessions have noted a decline in proactive participation. These type of indicators
              are usually associated with low energy levels and initial burnout signs.
            </div>
          </div>
          <div>
            <h2 className='font-manrope text-2xl mb-6'>What can you do as a leader?</h2>
            <div className='p-12 text-primary rounded-lg bg-gray-200 shadow-gray-700 shadow-lg font-poppins overflow-y-scroll'>
              Immediate Team Meeting: Organize an open and safe space for team members to voice their concerns and
              feelings. Ensure the meeting is not about finding faults but understanding challanges. Increase
              Transparency: Share with the team about the observed patterns without pointing fingers. Understanding that
              their feeling are recognized can be the first step to a solution. Adjust Workload: Temporarily reduce the
              workload or extend deadlines, giving the team some breathing space. Consider bringing in short-team
              resources to help alleviate the load. Individual Check-ins: Schedule one-on-one sessions with each team
              member. Personalized attention can help in identifying specific challanges.
            </div>
          </div>
        </section>
        <section className='flex flex-col w-2/6 justify-center my-auto place-content-center items-center ml-24 space-y-24 mt-40'>
          <div className='h-2/3 p-12 text-center text-primary rounded-lg bg-gray-200 shadow-gray-700 shadow-lg font-poppins'>
            <img className='w-12 text-center justify-center m-auto mb-4' src={graph} alt='' />
            <span className='font-bold justify-center'>-30%</span>

            <div>General Satisfaction</div>
          </div>
          <div className='h-2/3 p-12 text-primary text-center rounded-lg bg-gray-200 shadow-gray-700 shadow-lg font-poppins'>
            <img className='w-12 text-center justify-center m-auto mb-4' src={arrowdown} alt='' />
            <span className='font-bold justify-center'>-25%</span>
            <div>Meeting Engagement</div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};
