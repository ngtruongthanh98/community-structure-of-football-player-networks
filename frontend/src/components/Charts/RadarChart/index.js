import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const data = {
  labels: ['Defence', 'Physical', 'Speed', 'Vision', 'Attack', 'Technique', 'Aerial', 'Mental'],
  datasets: [
    {
      label: 'Mohamed Salah',
      data: [6, 10, 18, 14, 15, 17, 6, 11],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const RadarOptions = {
  scale: {
    ticks: {
      min: 0,
      max: 20,
      stepSize: 10,
      showLabelBackdrop: false,
      backdropColor: 'rgba(203, 197, 11, 1)',
    },
    angleLines: {
      color: 'rgba(255, 255, 255, .3)',
      lineWidth: 1,
    },
    gridLines: {
      color: 'rgba(255, 255, 255, .3)',
      circular: true,
    },
  },
};

const RadarChart = () => {
  return <Radar data={data} options={RadarOptions} className="customized-radar-chart" />;
};

export default RadarChart;
