import { useState, useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDashboard } from "../../hooks/useDashboard";

ChartJS.register(ArcElement, Tooltip, Legend);

// ... (código anterior)

export const Charts = () => {
  const { metricsForToday } = useDashboard();
  const surveyData = localStorage.getItem("surveyData");
  const [chartData, setChartData] = useState(null);
  const [hasData, setHasData] = useState(false);

  // Usar un arreglo de referencias para manejar múltiples gráficos
  const doughnutRefs = useRef([useRef(null), useRef(null), useRef(null), useRef(null)]);

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  useEffect(() => {
    const surveyData = localStorage.getItem("surveyData");
    const parsedData = JSON.parse(surveyData);
    if (!isEmptyObject(parsedData)) {
      setHasData(true);
      setChartData(parsedData);
    } else {
      setHasData(false);
    }
  }, [surveyData]);

  useEffect(() => {
    if (surveyData) {
      const todayMetrics = metricsForToday;
      const colors = [
        ["rgba(255, 99, 132, 0.5)", "rgba(255, 255, 255, 0)"],
        ["rgba(54, 162, 235, 0.5)", "rgba(255, 255, 255, 0)"],
        ["rgba(255, 206, 86, 0.5)", "rgba(255, 255, 255, 0)"],
        ["rgba(75, 192, 192, 0.5)", "rgba(255, 255, 255, 0)"],
        // Añade más colores según el número de gráficos
      ];

      const backgroundColorSum = "rgba(255, 99, 132, 0.5)";
      const backgroundColorNotSum = "rgba(255, 255, 255, 0)";
      const backgroundColorGray = "rgba(169, 169, 169, 0.5)";

      const dataSelf = {
        labels: ["Self Satisfaction"],
        datasets: [
          {
            data: [todayMetrics?.self_satisfaction, 100 - todayMetrics?.self_satisfaction],
            backgroundColor: [colors[0][0], backgroundColorGray],
            borderColor: [backgroundColorSum, backgroundColorNotSum],
            borderWidth: 1,
          },
        ],
      };

      const dataCollab = {
        labels: ["Team Collaboration"],
        datasets: [
          {
            data: [todayMetrics?.team_collaboration, 100 - todayMetrics?.team_collaboration],
            backgroundColor: [colors[1][0], backgroundColorGray],
            borderColor: [backgroundColorSum, backgroundColorNotSum],
            borderWidth: 1,
          },
        ],
      };

      const dataWork = {
        labels: ["Work Engagement"],
        datasets: [
          {
            data: [todayMetrics?.work_engagement, 100 - todayMetrics?.work_engagement],
            backgroundColor: [colors[2][0], backgroundColorGray],
            borderColor: [backgroundColorSum, backgroundColorNotSum],
            borderWidth: 1,
          },
        ],
      };

      const dataWorkSpace = {
        labels: ["Workspace Well-being Metric"],
        datasets: [
          {
            data: [todayMetrics?.workspace, 100 - todayMetrics.workspace],
            backgroundColor: [colors[3][0], backgroundColorGray],
            borderColor: [backgroundColorSum, backgroundColorNotSum],
            borderWidth: 1,
          },
        ],
      };

      setChartData({ dataSelf, dataCollab, dataWork, dataWorkSpace, hasData: true });
    } else {
      setChartData({ hasData: false });
      // Destruir instancias de gráficos al desmontar el componente
      doughnutRefs.current.forEach((ref) => {
        if (ref.current && ref.current.chartInstance) {
          ref.current.chartInstance.destroy();
        }
      });
    }
  }, [metricsForToday]);

  // ...
  const doughnutOptions = {
    maintainAspectRatio: false,
    responsive: true,
    type: "tick",
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  if (metricsForToday.length === 0) {
    return <p>NO DATA YET, TRY MAKING ACTIONS</p>;
  }
  return (
    <div className='flex -space-x-28 justify-center'>
      <>
        <div className=''>
          <Doughnut ref={doughnutRefs.current[0]} data={chartData.dataSelf} options={doughnutOptions} />
        </div>
        <div className=''>
          <Doughnut ref={doughnutRefs.current[1]} data={chartData.dataCollab} options={doughnutOptions} />
        </div>
        <div className=''>
          <Doughnut ref={doughnutRefs.current[2]} data={chartData.dataWork} options={doughnutOptions} />
        </div>
        <div className=''>
          <Doughnut ref={doughnutRefs.current[3]} data={chartData.dataWorkSpace} options={doughnutOptions} />
        </div>
      </>
    </div>
  );
};
