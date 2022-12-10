import React, { useState } from 'react';
import { Switch, Text } from '@nextui-org/react';
import './styles.scss';

import AddNewPlayer from './AddNewPlayer';
import DeletePlayer from './DeletePlayer';

const Management = () => {
  const [isDeletePlayerPage, setIsDeletePlayerPage] = useState(false);

  const onToggle = () => {
    setIsDeletePlayerPage(!isDeletePlayerPage);
  };

  return (
    <div className="management-page">
      <div className="change-page-bar">
        <Text className="page-name">Add player</Text>
        <Switch checked={isDeletePlayerPage} onChange={onToggle} />
        <Text className="page-name">Delete player</Text>
      </div>

      {isDeletePlayerPage ? <DeletePlayer /> : <AddNewPlayer />}
    </div>
  );
};

export default Management;
