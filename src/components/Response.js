import React, { useState } from 'react';

export default () => {
  const [queries, setQueries] = useState([]);
  const [urls, setUrls] = useState([]);
  const ws = new WebSocket(`${process.env.REACT_APP_WEB_SOCKET_URL}`);
  ws.onmessage = function(e) {
    const r = JSON.parse(e.data);
    const keys = Object.keys(r);
    const values = Object.values(r);
    setQueries(keys);
    setUrls(values);
  };
  const urlComponents = i => {
    if (!urls[i]) {
      return;
    }
    return urls[i].map(url => {
      return <img key={`${i}-${url}`} src={url} alt="" />;
    });
  };
  return (
    <div className="App">
      <h2>Response</h2>
      {queries.map((query, i) => {
        return (
          <div keys={i}>
            <p keys={i}>{query}</p>
            {urlComponents(i)}
          </div>
        );
      })}
    </div>
  );
};
