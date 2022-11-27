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
import PropTypes from 'prop-types';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

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

const RadarChart = (props) => {
  const data = {
    labels: props.statsLabelArray,
    datasets: [
      {
        label: props.playerName,
        data: props.statsDataArray,
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
        borderWidth: props.borderWidth,
      },
    ],
  };

  return <Radar data={data} options={RadarOptions} className="customized-radar-chart" />;
};

RadarChart.propTypes = {
  playerName: PropTypes.string,
  statsLabelArray: PropTypes.array,
  statsDataArray: PropTypes.array,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
};

RadarChart.defaultProps = {
  playerName: '',
  statsLabelArray: [
    'Defence',
    'Physical',
    'Speed',
    'Vision',
    'Attack',
    'Technique',
    'Aerial',
    'Mental',
  ],
  statsDataArray: [],
  backgroundColor: 'rgba(255, 99, 132, 0.2)',
  borderColor: 'rgba(255, 99, 132, 1)',
  borderWidth: 1,
};

export default RadarChart;
