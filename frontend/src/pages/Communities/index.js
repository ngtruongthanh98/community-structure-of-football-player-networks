import React, { useState } from 'react';
import './styles.scss';
import { Text, Switch } from '@nextui-org/react';
import FindSimilarPlayersPage from './FindSimilarPlayersPage';
import BuildAttributesGraphPage from './BuildAttributesGraphPage';

const Communities = () => {
  const [isFindSimilarPlayers, setIsFindSimilarPlayers] = useState(false);

  const onToggle = () => {
    setIsFindSimilarPlayers(!isFindSimilarPlayers);
  };

  return (
    <div className="communities-page">
      <div className="change-page-bar">
        <Text className="page-name">Build graph via selecting attributes</Text>
        <Switch checked={isFindSimilarPlayers} onChange={onToggle} />
        <Text className="page-name">Find similar players</Text>
      </div>

      {isFindSimilarPlayers ? <FindSimilarPlayersPage /> : <BuildAttributesGraphPage />}
    </div>
  );
};

export default Communities;
