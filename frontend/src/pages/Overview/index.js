import React from 'react';
import './styles.scss';
import ScatterChart from '../../components/Charts/ScatterChart';

const Overview = () => {
  return (
    <div className="overview-page">
      <div className="chart-box">
        <ScatterChart className="customized-chart" />
      </div>
    </div>
  );
};

export default Overview;
