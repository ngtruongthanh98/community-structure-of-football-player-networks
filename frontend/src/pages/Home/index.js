import React from 'react';
import './styles.scss';

import RadarChart from '../../components/Charts/RadarChart';

const Home = () => {
  return (
    <div className="homepage">
      <div className="chart-box">
        <RadarChart />
      </div>
    </div>
  );
};

export default Home;
