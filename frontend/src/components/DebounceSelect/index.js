import React from 'react';
import './styles.scss';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

const DebounceSelect = ({ fetchOptions, debounceTimeout = 800, ...props }) => {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const fetchRef = React.useRef(0);
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  console.log(options);
  if (options.length === 0) {
    // Example condition, its not fully handling
    options.push({
      label: 'Mohamed Salah',
      value: 'Mohamed Salah',
    });
  }

  console.log(options);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
};

export default DebounceSelect;
