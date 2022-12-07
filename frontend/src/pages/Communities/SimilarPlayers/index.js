import React from 'react';
import './styles.scss';
import RadarChart from '../../../components/Charts/RadarChart';

const SimilarPlayers = (props) => {
  return (
    <div className={props.className}>
      <div className="player-box">
        <div className="playerName">Mohamed Salah</div>

        <RadarChart />
      </div>
    </div>
  );
};

export default SimilarPlayers;
