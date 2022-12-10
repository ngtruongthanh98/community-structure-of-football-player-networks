import React from 'react';
import './styles.scss';
import RadarChart from '../../../components/Charts/RadarChart';

const SimilarPlayers = (props) => {
  return (
    <div className={props.className}>
      <div className="player-box">
        {/* <div className="playerName">Mohamed Salah</div> */}
        {props.statsLabelArray.length > 2 && (
          <RadarChart
            className="customized-radar-chart"
            playerName={props.playerName}
            statsLabelArray={props.statsLabelArray}
            statsDataArray={props.statsDataArray}
          />
        )}
        {/* Top Stats: {props.topStats.toString()} */}
      </div>
    </div>
  );
};

export default SimilarPlayers;
