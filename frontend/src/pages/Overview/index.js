import React from 'react';
import './styles.scss';
import ScatterChart from '../../components/Charts/ScatterChart';

const Overview = () => {
  return (
    <div className="overview-page">
      <ScatterChart className="customized-chart" />
    </div>
  );
};

export default Overview;
