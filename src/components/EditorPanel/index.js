import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  isEdge,
  updateEdge,
  removeElements,
  Controls,
  getConnectedEdges,
  Background
} from 'react-flow-renderer';

import Menu from './Menu';
import State from '../State';
import ButtonEdge from '../State/ButtonEdge';
import { v4 as uuidv4 } from 'uuid';

import { getFSM, postFSM, deleteFSM } from '../../store/action';

import './style.css';

const getId = () => `node_${uuidv4()}`;

const Panel = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [deletedNodeIds, setDeletedNodeIds] = useState([]);
  const [stateData, setStateData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const states = await getFSM();
      let sd = states.data.map(s => {
        return JSON.parse(s.data.replace('\\\"', '\"'));
      });
      setStateData(sd);
    }
    getData();
  }, [])
  
  const onGlobalSave = () => {
    // update deleted nodes
    deletedNodeIds.forEach(d => {
      deleteFSM(d);
    })

    // update edges to deleted nodes
    let stateIds = stateData.map(sd => sd.id);

    let newStateData = stateData;
    stateData.forEach(s => {
      s.sections.forEach(_s => {
        if (_s.type === "text" && _s.buttons) {
          _s.buttons.forEach((b, idx, arr) => {
            if (stateIds.indexOf(b.edgeTo) === -1) {
              arr[idx].edgeTo = "";
            }
          })
        } else if (_s.type === "carousel") {
          _s.content.forEach((c, c_idx, arr) => {
            if (stateIds.indexOf(c.buttons[0].edgeTo) === -1) {
              arr[c_idx].buttons[0].edgeTo = "";
            }
          })
        }
      })
    })
    setStateData(newStateData);

    stateData.forEach(s => {
      postFSM(s.id, s);
    })
  }

  const onConnect = (params) => {
    let sectionIdx = params.sourceHandle.split('_')[0];
    let buttonIdx = params.sourceHandle.split('_')[1];

    setElements((els) => {
      return addEdge({ 
        ...params, 
        type: 'button', 
        data: {onDelete: deleteElementById} 
      }, els)
    });

    let newStateData = stateData;
    stateData.forEach((s, idx, arr) => {
      if (s.id === params.source) {
        if (s.sections[sectionIdx].type === "text") {
          arr[idx].sections[sectionIdx].buttons[buttonIdx].edgeTo = params.target;
        } else if (s.sections[sectionIdx].type === "carousel") {
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
        if (s.sections[sectionIdx].type === "text") {
          arr[idx].sections[sectionIdx].buttons[buttonIdx].edgeTo = newConnection.target;
        } else if (s.sections[sectionIdx].type === "carousel") {
          arr[idx].sections[sectionIdx].content[buttonIdx].buttons[0].edgeTo = newConnection.target;
        }
      }
    });
    setStateData(newStateData);
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  }

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const getPosition = (x, y) => {
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    return reactFlowInstance.project({
      x: x - reactFlowBounds.left,
      y: y - reactFlowBounds.top,
    });
  }

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    let newId = getId()
    console.log(newId);
    const newNode = {
      id: newId,
      type: "node",
      position,
      data: {
        id: newId,
        type,
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
        },
        onSetPosition: (x, y) => {
          setStateData(sd => {
            return sd.map(s => {
              if (s.id === newId) {
                s.position = getPosition(x, y);
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
      if (targetElement[0].type === "node") {
        setDeletedNodeIds(ids => {
          if (ids.indexOf(id) === -1) {
            ids.push(id)
            return ids;
          }
        });
        console.log(deletedNodeIds);
        stateData.splice(stateData.findIndex(s => s.id === id), 1);
        setStateData(stateData);
        const edges = reactFlowInstance.getElements().filter(e => isEdge(e));
        const connectedEdges = getConnectedEdges(targetElement, edges);
        return removeElements([...targetElement, ...connectedEdges], els);  
      } else if (targetElement[0].type === "button") {
        let sectionIdx = targetElement[0].sourceHandle.split('_')[0];
        let buttonIdx = targetElement[0].sourceHandle.split('_')[1];
        let newStateData = stateData;
        stateData.forEach((s, idx, arr) => {
          if (s.id === targetElement[0].source) {
            if (s.sections[sectionIdx].type === "text") {
              arr[idx].sections[sectionIdx].buttons[buttonIdx].edgeTo = "";
            } else if (s.sections[sectionIdx].type === "carousel") {
              arr[idx].sections[sectionIdx].content[buttonIdx].buttons[0].edgeTo = "";
            }
          }
        });
        setStateData(newStateData);
        console.log(stateData);

        return removeElements([...targetElement], els);  
      }
    }),
    [reactFlowInstance, stateData],
  )

  useEffect(() => {
    // set nodes
    setElements(stateData.map(s => {
      return {
        ...s, 
        type: "node",
        data: {
          id: s.id,
          type: s.type,
          stateData: s,
          onDelete: deleteElementById,
          onSaveState: (newSections, title) => {
            setStateData(sd => {
              return sd.map(_s => {
                if (_s.id === s.id) {
                  _s.sections = newSections;
                  _s.title = title;
                }
                return _s;
              })
            })
          },
          onSetPosition: (x, y) => {
            console.log(x, y);
            setStateData(sd => {
              return sd.map(_s => {
                if (_s.id === s.id) {
                  _s.position = getPosition(x, y);
                }
                return _s;
              })
            })
          }
        }
      }
    }));

    // link edges
    stateData.forEach(s => {
      if (s.sections) {
        s.sections.forEach((se, se_idx) => {
          if (se.type === "text" && se.buttons) {
            se.buttons.forEach((b, b_idx) => {
              if (b.edgeTo !== "") {
                let params = {
                  source: s.id,
                  sourceHandle: `${se_idx}_${b_idx}`,
                  target: b.edgeTo,
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
          } else if (se.type === "carousel") {
            se.content.forEach((c, c_idx) => {
              if (c.buttons[0].edgeTo !== "") {
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
                    data: { onDelete: deleteElementById }
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
            <Background
              variant="lines"
              gap={100}
              size={2}
            />
          </ReactFlow>
        </div>
        <Menu onGlobalSave={onGlobalSave} />
      </ReactFlowProvider>
    </div>
  );
};

export default Panel;