import React, { useState } from 'react';

export default () => {
  const [queries, setQueries] = useState([...Array(10)].map(() => ''));
  const onChangeInput = (index, e) => {
    const newQueries = queries.map((q, i) => {
      if (index !== i) {
        return q;
      } else {
        return e.target.value;
      }
    });
    setQueries(newQueries);
  };
  const inputs = queries.map((q, i) => {
    return (
      <div key={i}>
        <input type="text" value={q} key={i} onChange={e => onChangeInput(i, e)} />
      </div>
    );
  });
  return (
    <div className="App">
      <h2>Request</h2>
      {inputs}
    </div>
  );
};
