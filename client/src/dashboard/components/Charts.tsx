import React from "react";
import Chart from "react-apexcharts";
import { useDashboard } from "../../hooks/useDashboard";

const MetricChart = ({ metricName, value, color }) => {
  const chartOptions = {
    chart: {
      type: "donut",
    },
    labels: [metricName],
    colors: [color, "#D3D3D3"], // Color para la métrica y gris para la parte faltante
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 680,
        options: {
          chart: {
            width: 1000,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        // Mostrar solo el valor para la serie 1
        return opts.seriesIndex === 0 ? val.toFixed(0) : "";
      },
    },
    tooltip: {
      enabled: false,
    },
  };

  const seriesData = [value, 100 - value];

  return (
    <div className='col'>
      <Chart options={chartOptions} series={seriesData} type='donut' />
      <div>
        <p className='text-center text-lg'>{metricName}</p>
      </div>
    </div>
  );
};

export const Charts = () => {
  const { metricsForToday } = useDashboard();

  return (
    <div className='flex'>
      <h1>Metric Pie Charts</h1>
      <MetricChart metricName='Self Satisfaction' value={metricsForToday.self_satisfaction} color='#FF6384' />
      <MetricChart metricName='Team Collaboration' value={metricsForToday.team_collaboration} color='#36A2EB' />
      <MetricChart metricName='Work Engagement' value={metricsForToday.work_engagement} color='#FFCE56' />
      <MetricChart metricName='Workspace Well-being Metric' value={metricsForToday.workspace} color='#4CAF50' />
    </div>
  );
};
