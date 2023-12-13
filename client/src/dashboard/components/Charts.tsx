import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useDashboard } from "../../hooks/useDashboard";

export const Charts = () => {
  const { metricsForToday } = useDashboard();
  const surveyData = localStorage.getItem("surveyData");
  const [chartData, setChartData] = useState(null);
  const [hasData, setHasData] = useState(false);
  const [defaultChartData, setDefaultChartData] = useState({
    labels: [],
    datasets: [],
  });

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
    if (metricsForToday) {
      const todayMetrics = metricsForToday;
      const colors = [
        ["rgba(255, 99, 132, 0.5)", "rgba(255, 255, 255, 0)"],
        ["rgba(54, 162, 235, 0.5)", "rgba(255, 255, 255, 0)"],
        ["rgba(255, 206, 86, 0.5)", "rgba(255, 255, 255, 0)"],
        ["rgba(75, 192, 192, 0.5)", "rgba(255, 255, 255, 0)"],
      ];

      const backgroundColorSum = "rgba(255, 99, 132, 0.5)";
      const backgroundColorNotSum = "rgba(255, 255, 255, 0)";
      const backgroundColorGray = "rgba(169, 169, 169, 0.5)";

      const selfSatisfactionValue = todayMetrics?.self_satisfaction || 0;
      const teamCollaborationValue = todayMetrics?.team_collaboration || 0;
      const workEngagementValue = todayMetrics?.work_engagement || 0;
      const workspaceValue = todayMetrics?.workspace || 0;

      const dataSelf = {
        labels: ["self_satisfaction"],
        datasets: [
          {
            data: [selfSatisfactionValue, 100 - selfSatisfactionValue],
            backgroundColor: [colors[0][0], backgroundColorGray],
            borderColor: [backgroundColorSum, backgroundColorNotSum],
            borderWidth: 1,
          },
        ],
      };

      const dataCollab = {
        labels: ["team_collaboration"],
        datasets: [
          {
            data: [teamCollaborationValue, 100 - teamCollaborationValue],
            backgroundColor: [colors[1][0], backgroundColorGray],
            borderColor: [backgroundColorSum, backgroundColorNotSum],
            borderWidth: 1,
          },
        ],
      };

      const dataWork = {
        labels: ["work_engagement"],
        datasets: [
          {
            data: [workEngagementValue, 100 - workEngagementValue],
            backgroundColor: [colors[2][0], backgroundColorGray],
            borderColor: [backgroundColorSum, backgroundColorNotSum],
            borderWidth: 1,
          },
        ],
      };

      const dataWorkSpace = {
        labels: ["workspace"],
        datasets: [
          {
            data: [workspaceValue, 100 - workspaceValue],
            backgroundColor: [colors[3][0], backgroundColorGray],
            borderColor: [backgroundColorSum, backgroundColorNotSum],
            borderWidth: 1,
          },
        ],
      };

      setChartData({ dataSelf, dataCollab, dataWork, dataWorkSpace, hasData: true });
    } else {
      setChartData(defaultChartData);

      doughnutRefs.current.forEach((ref) => {
        if (ref.current && ref.current.chartInstance) {
          ref.current.chartInstance.destroy();
        }
      });
    }
  }, [metricsForToday, defaultChartData]);

  useEffect(() => {
    if (metricsForToday) {
      const colors = [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
      ];

      const chartKeys = Object.keys(metricsForToday);

      chartKeys.forEach((key, index) => {
        const data = chartData[key];
        const ctx = doughnutRefs.current[index].getContext("2d");
        doughnutRefs.current[index].chartInstance = new Chart(ctx, {
          type: "doughnut",
          data: data,
          options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
              tooltip: {
                enabled: true,
              },
            },
          },
        });
      });
    }
  }, [metricsForToday, chartData]);

  if (!hasData) {
    return <p>NO DATA YET, TRY MAKING ACTIONS</p>;
  }

  return (
    <div className='flex -space-x-28 justify-center'>
      <>
        <div className=''>
          <canvas ref={doughnutRefs.current[0]} width='400' height='400' />
        </div>
        <div className=''>
          <canvas ref={doughnutRefs.current[1]} width='400' height='400' />
        </div>
        <div className=''>
          <canvas ref={doughnutRefs.current[2]} width='400' height='400' />
        </div>
        <div className=''>
          <canvas ref={doughnutRefs.current[3]} width='400' height='400' />
        </div>
      </>
    </div>
  );
};
