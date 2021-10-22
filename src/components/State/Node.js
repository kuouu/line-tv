import React, { useState, useEffect } from 'react';
import { Handle } from 'react-flow-renderer';

import State from './index';

const Node = ({ data }) => {
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    data.sections.forEach(s => {
      if (s.buttons) {
        setEdges((es => es.concat(s.buttons)));
      }
    });
  }, [data.sections]);

  return (
    <div style={{border: "1px #000 solid", borderRadius: "4px", padding: "2px"}}>
      <Handle type="target" position="left"/>
      <State 
        id={data.id}
        onDelete={data.onDelete}
      />
      {edges.map((e, idx) => {
        return (
          <Handle
            key={idx}
            type="source"
            position="right"
            id="a"
            style={{ top: `${((idx+1)/(edges.length+1)) * 100}%` }}
          />  
        )
      })}
    </div>
  );
};

export default Node;
