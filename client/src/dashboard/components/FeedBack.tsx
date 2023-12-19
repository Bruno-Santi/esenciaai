import { BackButton } from ".";
import { arrowdown, graph } from "../../assets";
import { useDocumentTitle } from "../../hooks";
import { DashboardLayout } from "../../layaout/DashboardLayout";
const data = {
  recommendation: {
    content: {
      item1:
        "Durante esta semana, hemos observado un aumento significativo en la satisfacción general de nuestro equipo de trabajo, con un incremento del 18.75% con respecto a la semana anterior. Los cuadrantes que registraron mayores mejoras fueron Work Engagement y Self Satisfaction, con un aumento del 22% y 20% respectivamente. Sin embargo, todavía encontramos oportunidades de mejora en el cuadrante de Team Collaboration, donde se registró un incremento del 17%. Por último, el cuadrante de Workspace Well-Being también mostró un aumento del 16%. En general, podemos percibir un ambiente más positivo y comprometido en el equipo.",
      item2: {
        "Estar al tanto de las necesidades de los empleados":
          "Un tema recurrente en los comentarios fue el salario y las preocupaciones financieras. Es importante ofrecer espacios donde los empleados puedan expresar sus inquietudes y brindarles acompañamiento y apoyo, ya sea mediante asesoramiento financiero o incentivos adicionales.",
        "Mejorar la Comunicación":
          "Dado que el cuadrante de Team Collaboration registró un menor crecimiento en comparación con los demás, es importante no descuidar la comunicación entre los miembros del equipo. Podemos fomentar espacios de reunión regulares, tanto presenciales como virtuales, donde se promueva el intercambio de ideas y se resuelvan dudas o conflictos.",
        "Promover el Compañerismo":
          "Uno de los aspectos mencionados por el equipo fue el valor del compañerismo. Para abordar esta necesidad, podemos organizar actividades sociales, como almuerzos o salidas en grupo, que fortalezcan la relación entre los miembros del equipo y fomenten la camaradería.",
        "Promover la participación y el aporte de ideas":
          "Se sugirió mejorar la transparencia y la participación en el equipo. Podemos implementar un sistema de sugerencias o un buzón de ideas, donde los empleados puedan expresar sus propuestas de mejora y sentirse escuchados. Además, podemos realizar reuniones periódicas para revisar estas ideas y ponerlas en práctica cuando sea posible.",
      },
    },
    date: {
      $date: "2023-12-19T00:00:00Z",
    },
    general_satisfaction: 18.75,
    quadrant: {
      "Workspace Well-Being": 16,
    },
  },
};

console.log(data.recommendation.content.item1);

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
              {data.recommendation.content.item1}
            </div>
          </div>
          <div>
            <h2 className='font-manrope text-2xl mb-6'>What can you do as a leader?</h2>
            <div className='p-12 text-primary rounded-lg bg-gray-200 mb-16 shadow-gray-700 overflow-y-scroll shadow-lg font-poppins '>
              {Object.entries(data.recommendation.content.item2).map(([key, value]) => (
                <div key={key}>
                  <h2 className='font-bold font-poppins'>{key}:</h2>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className='flex flex-col w-2/6 justify-center my-auto place-content-center items-center ml-24 space-y-24 mt-40'>
          <div className='h-2/3 p-12 text-center text-primary rounded-lg bg-gray-200 shadow-gray-700 shadow-lg font-poppins'>
            <img className='w-12 text-center justify-center m-auto mb-4' src={graph} alt='' />
            <span className='font-bold justify-center'>-{data.recommendation.general_satisfaction}%</span>

            <div>General Satisfaction</div>
          </div>
          <div className='h-2/3 p-12 text-primary text-center rounded-lg bg-gray-200 shadow-gray-700 shadow-lg font-poppins'>
            <img className='w-12 text-center justify-center m-auto mb-4' src={arrowdown} alt='' />
            <span className='font-bold justify-center'>-{Object.values(data.recommendation.quadrant)}%</span>
            <div>Meeting Engagement</div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};
