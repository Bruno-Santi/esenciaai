import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import moment from "moment";
import "chartjs-adapter-moment";
import { useDashboard } from "../../hooks/useDashboard";

const formatDate = (dateString) => moment(dateString).format("MM/DD/YYYY");

export const LineCharts = () => {
  const { linesMetrics } = useDashboard();
  const chartContainer = useRef(null)
  const chartInstance = useRef(null);
  const adjustCanvasSize = () => {
    const canvas = chartContainer.current;

    canvas.width = window.innerWidth;
    canvas.height = 200; 
  };
  useEffect(() => {
    adjustCanvasSize();

    window.addEventListener('resize', adjustCanvasSize);

    return () => {
      window.removeEventListener('resize', adjustCanvasSize);
    };
  }, []); 

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Self Satisfaction",
        data: [],
        borderColor: "rgba(255, 99, 132, 0.5)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Team Collaboration",
        data: [],
        borderColor: "rgba(54, 162, 235, 0.5)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "Work Engagement",
        data: [],
        borderColor: "rgba(255, 206, 86, 0.5)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "Workspace",
        data: [],
        borderColor: "rgba(75, 192, 192, 0.5)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  });

  useEffect(() => {
    if (linesMetrics && linesMetrics.label_x.length > 0) {
      const updatedData = {
        labels: linesMetrics.label_x.map(formatDate),
        datasets: chartData.datasets.map((dataset) => {
          const key = dataset.label.replace(/\s+/g, "_").toLowerCase(); // Reemplazar espacios por guiones bajos
          const values = linesMetrics[key] || Array(linesMetrics.label_x.length).fill(0);
          return {
            ...dataset,
            data: values.map((value) => (value !== undefined ? value : 0)),
          };
        }),
      };

      setChartData(updatedData);
    }
  }, [linesMetrics]);

  useEffect(() => {
    if (chartContainer.current && chartData.labels.length > 0) {
      if (!chartInstance.current) {
        chartInstance.current = new Chart(chartContainer.current.getContext("2d"), {
          type: "line",
          data: chartData,
          options: {
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day",
                  parser: "MM/DD/YYYY",
                  tooltipFormat: "ll",
                },
              },
            },
            plugins: {
              title: {
                display: true,
              },
            },
          },
        });
      } else {
        chartInstance.current.data.labels = chartData.labels;
        chartInstance.current.data.datasets.forEach((dataset, index) => {
          dataset.data = chartData.datasets[index].data;
        });
        chartInstance.current.update();
      }
    }
  }, [chartData]);

  return (
    <div>
      <canvas ref={chartContainer} style={{ marginBottom: "10px", width: "100%", height: "200px" }} />
    </div>
  );
};
