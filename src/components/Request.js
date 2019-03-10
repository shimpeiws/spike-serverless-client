import React, { useState } from 'react';
import axios from 'axios';

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
  const onRequest = async () => {
    console.info('queries', queries);
    const validQueries = queries.filter(query => !!query);
    const requests = validQueries.map(q => {
      const data = {
        message: q
      };
      axios.post('https:/dev-spike-serverless.high-pine.com/put-to-sqs', data);
    });
    const r = await Promise.all(requests);
    console.info('r', r);
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
      <button onClick={onRequest}>Request</button>
    </div>
  );
};
