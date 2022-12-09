import React, { useState } from 'react';
import { Switch, Text } from '@nextui-org/react';
import './styles.scss';

import AddNewPlayer from './AddNewPlayer';
import DeletePlayer from './DeletePlayer';

const Management = () => {
  const [isAddPlayerPage, setIsAddPlayerPage] = useState(true);

  const onToggle = () => {
    setIsAddPlayerPage(!isAddPlayerPage);
  };

  return (
    <div className="management-page">
      <div className="change-page-bar">
        <Text className="page-name">Delete player</Text>
        <Switch checked={isAddPlayerPage} onChange={onToggle} />
        <Text className="page-name">Add player</Text>
      </div>

      {isAddPlayerPage ? <AddNewPlayer /> : <DeletePlayer />}
    </div>
  );
};

export default Management;
