import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import moment from "moment";
import "chartjs-adapter-moment";
import { useDashboard } from "../../hooks/useDashboard";

const formatDate = (dateString) => moment(dateString).format("MM/DD/YYYY");

export const LineCharts = () => {
  const { linesMetrics } = useDashboard();
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer.current && linesMetrics && linesMetrics.label_x) {
      const ctx = chartContainer.current.getContext("2d");

      if (chartContainer.current.chart) {
        chartContainer.current.chart.destroy();
      }

      const colors = [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
      ];

      chartContainer.current.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: linesMetrics.label_x.map(formatDate),
          datasets: [
            {
              label: "Self Satisfaction",
              data: linesMetrics.self_satisfaction,
              borderColor: colors[0],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
            {
              label: "Team Collaboration",
              data: linesMetrics.team_collaboration,
              borderColor: colors[1],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
            },
            {
              label: "Work Engagement",
              data: linesMetrics.work_engagement,
              borderColor: colors[2],
              backgroundColor: "rgba(255, 206, 86, 0.2)",
            },
            {
              label: "Workspace",
              data: linesMetrics.workspace,
              borderColor: colors[3],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
          ],
        },
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
    }

    return () => {
      if (chartContainer.current && chartContainer.current.chart) {
        chartContainer.current.chart.destroy();
      }
    };
  }, [linesMetrics]);
  if (linesMetrics.length === 0) return <p>NO DATA YET, TRY MAKING ACTIONS</p>;
  return (
    <div>
      <canvas ref={chartContainer} style={{ marginBottom: "10px", width: "100%", height: "200px" }} />
    </div>
  );
};
