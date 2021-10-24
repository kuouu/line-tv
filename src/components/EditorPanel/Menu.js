import React from 'react';

import { Button } from '@chakra-ui/button';

const Menu = ({onGlobalSave}) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'node')} draggable>
        Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'end')} draggable>
        End Node
      </div>
      <Button onClick={onGlobalSave}>Save</Button>
    </aside>
  );
};

export default Menu;
