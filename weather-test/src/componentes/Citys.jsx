import React, { useState } from 'react';
import Select from 'react-select';
import Papa from 'papaparse';

const Citys = () => {
  const [options, setOptions] = useState([]);

  const changeHandler = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
          if (results.data && results.data.length > 0) {
            const updatedOptions = results.data.map((row) => ({
              value: row.name,
              label: `${row.name}, ${row.country}`
            }));

            setOptions(updatedOptions);
          }
        }
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        style={{ display: 'block', margin: '10px auto' }}
      />
      <Select options={options} />
    </div>
  );
};

export default Citys;
