import React, { useState } from 'react';
import './styles.scss';
import DebounceSelect from '../../../components/DebounceSelect';
import { getPlayer } from '../../../services/player';

const BuildAttributesGraphPage = () => {
  const [value, setValue] = useState([]);

  // mock data
  async function fetchUserList(name) {
    if (name === '') {
      return [];
    }

    return getPlayer(name).then((res) => {
      const returnedValue = res.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      return returnedValue;
    });
  }

  return (
    <div className="search-box">
      <div className="title">Choose attributes to build graph</div>

      <DebounceSelect
        mode="multiple"
        value={value}
        placeholder="Find attributes"
        fetchOptions={fetchUserList}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        style={{
          width: '300px',
        }}
        className="select-input"
      />
    </div>
  );
};

export default BuildAttributesGraphPage;
