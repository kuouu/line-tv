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

import states from '../../store/state';

import './style.css';

let id = 1;
const getId = () => `node_${id++}`;

const Panel = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [stateData, setStateData] = useState(states);

  const onConnect = (params) => {
    let sectionIdx = params.sourceHandle.split('_')[0];
    let buttonIdx = params.sourceHandle.split('_')[1];

    setElements((els) => {
      console.log(params);
      return addEdge({ 
        ...params, 
        type: 'button', 
        data: {onDelete: deleteElementById} 
      }, els)
    });

    let newStateData = stateData;
    stateData.forEach((s, idx, arr) => {
      if (s.id === params.source) {
        if (s.type === "text" && s.buttons) {
          arr[idx].sections[sectionIdx].buttons[buttonIdx].edgeTo = params.target;
        } else if (s.type === "carousel") {
          arr[idx].sections[sectionIdx].content[buttonIdx].buttons[0].edgeTo = params.target;
        }
      }
    });

    setStateData(newStateData);
  }

  const onEdgeUpdate = (oldEdge, newConnection) => {
    let sectionIdx = newConnection.sourceHandle.split('_')[0];
    let buttonIdx = newConnection.sourceHandle.split('_')[1];
    let newStateData = stateData;
    stateData.forEach((s, idx, arr) => {
      if (s.id === newConnection.source) {
        if (s.type === "text" && s.buttons) {
          arr[idx].sections[sectionIdx].buttons[buttonIdx].edgeTo = newConnection.target;
        } else if (s.type === "carousel") {
          arr[idx].sections[sectionIdx].content[buttonIdx].buttons[0].edgeTo = newConnection.target;
        }
      }
    });
    setStateData(newStateData);
    console.log(newStateData);
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  }
  
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
      data: { 
        id: newId,
        onDelete: deleteElementById,
        stateData: null,
        onSaveState: (newSections) => {
          setStateData(sd => {
            return sd.map(s => {
              if (s.id === newId) {
                s.sections = newSections;
              }
              return s;
            })
          })
        }
      },
    };

    setElements((es) => es.concat(newNode));
    setStateData(sd => sd.concat({
      id: newId,
      type,
      position,
      title: "",
      sections: []
    }))
  };

  const deleteElementById = useCallback(
    (id) => setElements((els) => {
      const targetElement = els.filter(e => e.id === id);
      stateData.splice(stateData.findIndex(s => s.id === id), 1);
      setStateData(stateData);

      const edges = reactFlowInstance.getElements().filter(e => isEdge(e));
      const connectedEdges = getConnectedEdges(targetElement, edges);        
      return removeElements([...targetElement, ...connectedEdges], els);
    }),
    [reactFlowInstance, stateData],
  )

  useEffect(() => {
    setElements(stateData.map(s => {
      return {
        ...s, 
        data: {
          id: s.id,
          onDelete: deleteElementById,
          stateData: s,
          onSaveState: (newSections) => {
            setStateData(sd => {
              return sd.map(_s => {
                if (_s.id === s.id) {
                  _s.sections = newSections;
                }
                return _s;
              })
            })
          }
        }
      }
    }));

    stateData.forEach(s => {
      if (s.sections) {
        s.sections.forEach((se, se_idx) => {
          if (se.type === "text" && se.buttons) {
            se.buttons.forEach((b, b_idx) => {
              let params = {
                source: s.id,
                sourceHandle: `${se_idx}_${b_idx}`,
                target: b.edgeTo,
                targetHandle: null
              }
              // console.log(params);
              setElements((els) => {
                return addEdge({ 
                  ...params,
                  type: 'button', 
                  data: {onDelete: deleteElementById} 
                }, els)
              });
            })
          } else if (se.type === "carousel") {
            se.content.forEach((c, c_idx) => {
              if (c.buttons[0].edgeTo !== " ") {
                let params = {
                  source: s.id,
                  sourceHandle: `${se_idx}_${c_idx}`,
                  target: c.buttons[0].edgeTo,
                  targetHandle: null
                }
                setElements((els) => {
                  return addEdge({ 
                    ...params,
                    type: 'button', 
                    data: {onDelete: deleteElementById} 
                  }, els)
                });  
              }
            })
          }    
        });
      }
    })
  }, [deleteElementById, stateData])

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
            onEdgeUpdate={onEdgeUpdate}
            onLoad={
              (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance)
            }
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={{
              node: State
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