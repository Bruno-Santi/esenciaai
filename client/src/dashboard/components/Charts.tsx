import React from "react";
import { VictoryPie, VictoryTooltip } from "victory";
import { useDashboard } from "../../hooks/useDashboard";

const MetricChart = ({ metricName, value, color }) => {
  const data = [
    { x: metricName, y: value },
    { x: "", y: 100 - value },
  ];

  return (
    <div className='col' style={{ width: 150, height: 100, margin: 16 }}>
      <VictoryPie
        data={data}
        width={150}
        height={100}
        colorScale={[color, "#D3D3D3"]}
        innerRadius={20}
        labels={() => null} // Para ocultar las etiquetas
        padding={7} // Ajuste de padding
        labelComponent={
          <VictoryTooltip
            style={{ fontSize: 14 }}
            flyoutStyle={{ fill: "white", stroke: "gray", strokeWidth: 1 }}
            cornerRadius={5}
            flyoutPadding={10}
            orientation='top'
            renderInPortal={false}
            text={({ datum }) => `${datum.y}`}
          />
        }
        animate={{ duration: 500, easing: "bounce" }} // Agregar animación de rotación
      />
      <div>
        <p className='text-center text-xl pt-2'>{metricName}</p>
      </div>
    </div>
  );
};

export const Charts = () => {
  const { metricsForToday } = useDashboard();

  return (
    <div className='flex mx-auto justify-center space-x-6'>
      <MetricChart metricName='Self Satisfaction' value={metricsForToday.self_satisfaction} color='#FF6384' />
      <MetricChart metricName='Team Collaboration' value={metricsForToday.team_collaboration} color='#36A2EB' />
      <MetricChart metricName='Work Engagement' value={metricsForToday.work_engagement} color='#FFCE56' />
      <MetricChart metricName='Workspace Well-being Metric' value={metricsForToday.workspace} color='#4CAF50' />
    </div>
  );
};
