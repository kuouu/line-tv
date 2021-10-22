import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  isEdge,
  updateEdge,
  removeElements,
  Controls,
  getConnectedEdges
} from 'react-flow-renderer';

import Menu from './Menu';
import State from '../State';
import ButtonEdge from '../State/ButtonEdge';
import Node from '../State/Node';

import states from '../../store/state';

import './style.css';

let id = 1;
const getId = () => `node_${id++}`;

const Panel = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState([]);

  const onConnect = (params) => 
    setElements((els) => addEdge({ ...params, type: 'button', data: {onDelete: deleteElementById} }, els));
  

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    let newId = getId()
    const newNode = {
      id: newId,
      type,
      position,
      data: { label: (
        <State id={newId} onDelete={deleteElementById}/>
      ) },
    };

    setElements((es) => es.concat(newNode));
  };

  const deleteElementById = useCallback(
    (id) => setElements((els) => {
      const targetElement = els.filter(e => e.id === id);
      const edges = reactFlowInstance.getElements().filter(e => isEdge(e));
      const connectedEdges = getConnectedEdges(targetElement, edges);        
      return removeElements([...targetElement, ...connectedEdges], els);
    }),
    [reactFlowInstance],
  )

  useEffect(() => {
    setElements(states.map(s => {
      return {
        ...s, 
        data: {
          title: s.title,
          id: s.id,
          sections: s.sections,
          onDelete: deleteElementById,
        }
      }
    }));
  }, [deleteElementById])

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={
              (elementsToRemove) => 
                setElements((els) => removeElements(elementsToRemove, els))
            }
            onEdgeUpdate={
              (oldEdge, newConnection) =>
                setElements((els) => updateEdge(oldEdge, newConnection, els))
            }
            onLoad={
              (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance)
            }
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={{
              node: Node
            }}
            edgeTypes={{
              button: ButtonEdge
            }}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Menu />
      </ReactFlowProvider>
    </div>
  );
};

export default Panel;