import React, { useState } from 'react'

import {
  CloseButton,
  SimpleGrid,
  VStack,
  Flex,
  Spacer,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Icon,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from "@chakra-ui/react"

import { BsTextareaT, BsImage, BsGrid1X2 } from "react-icons/bs"
import { BiCarousel } from "react-icons/bi"
import { MdOutlineDragIndicator, MdEditNote, MdOutlineClose } from "react-icons/md"

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Handle } from 'react-flow-renderer';

import MessageSection, { MessageTypeMap } from "../Message";
import states from '../../store/state';

const SectionTemplates = {
  "img": {
    type: "img",
    url: ""
  },
  "text": {
    type: "text",
    content: "",
    buttons: []
  },
  "carousel": {
    type: "carousel",
    content: []
  }
}

const State = ({ data }) => {
  const { id, onDelete } = data;
  let stateData = states.find(s => s.id === id);
  const [sections, setSections] = useState(stateData ? JSON.parse(JSON.stringify(stateData.sections)) : []);
  const [originalSections, setOriginalSections] = useState(stateData ? JSON.parse(JSON.stringify(stateData.sections)) : []);
  const [title, setTitle] = useState(stateData?.title || "");
  const [editIdx, setEditIdx] = useState(-1);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSave = async () => {
    // sync to backend DB
    setOriginalSections(JSON.parse(JSON.stringify(sections)));
  }

  const onCancel = () => {
    setSections(JSON.parse(JSON.stringify(originalSections)));
  }

  const onDragEnd = (res) => {
    if (!res.destination) {
      return;
    }

    setSections(ss => {
      const result = Array.from(ss);
      const [removed] = result.splice(res.source.index, 1);
      result.splice(res.destination.index, 0, removed);

      return result;
    });
  }

  const onRemoveSection = (idx) => {
    setSections(ss => {
      const result = Array.from(ss);
      result.splice(idx, 1);
      return result;
    });
  }

  const onEditSection = (idx, key, value) => {
    setSections(ss => {
      const result = Array.from(ss);
      result[idx][key] = value;
      return result;
    });
  }

  const onNewSection = (type) => {
    let newSection = SectionTemplates[type];
    setSections(ss => {
      return [...ss, newSection];
    })
  }

  return (
    <div style={{ border: "1px #000 solid", borderRadius: "4px", padding: "2px" }}>
      <Handle type="target" position="left" />
      <VStack onClick={onOpen}>
        <Flex width="100%" alignItems="center">
          <Box padding="0 8px">{title}</Box>
          <Spacer />
          <CloseButton size="sm" onClick={() => {
            onDelete(id);
          }} />
        </Flex>
        {sections.map((s, s_idx) => {
          if (s.buttons) {
            return ([
              <hr style={{ margin: "1px", width: "100%", border: "#000 1px solid" }} />,
              ...s.buttons.map((b, b_idx) => {
                return (
                  <Box key={`${s_idx}_${b_idx}`} style={{ margin: 0, width: "100%", position: "relative", textAlign: "center" }} >
                    {b.text}
                    <Handle type="source" id={`${s_idx}_${b_idx}`} position="right" style={{ top: "50%" }} />
                  </Box>
                )
              })
            ])
          } else if (s.content) {
            return ([
              <hr style={{ margin: "1px", width: "100%", border: "#000 1px solid" }} />,
              ...s.content.map((b, b_idx) => {
                return (
                  <Box key={`${s_idx}_${b_idx}`} style={{ margin: 0, width: "100%", position: "relative", textAlign: "center" }} >
                    {b.buttons[0].text}
                    <Handle type="source" id={`${s_idx}_${b_idx}`} position="right" style={{ top: "50%" }} />
                  </Box>
                )
              })
            ])
          }
          return null;
        })}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Input
              placeholder="Title here"
              variant="flushed"
              maxWidth="90%"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {sections.map((s, idx, arr) => (
                      <Draggable key={idx} draggableId={`${id}_${idx}`} index={idx}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <Box
                              p="6px 10px"
                              _hover={{ bg: '#EDF2F7', transition: '0.3s', borderRadius: '6px' }}
                              role="group"
                              key={idx}
                            >
                              <Flex width="100%" alignItems="center" justifyContent="space-between">
                                <Flex alignItems="center">
                                  <Text fontSize="sm" {...provided.dragHandleProps}>
                                    <Icon as={MdOutlineDragIndicator} width="0px" style={{ transition: '0.2s' }} _groupHover={{ width: '12px' }} />
                                  </Text>
                                  <Text fontWeight="bold" fontSize="sm">{`#${idx + 1} ${MessageTypeMap[s.type]}`}</Text>
                                </Flex>
                                <Flex alignItems="center">
                                  <Icon
                                    as={MdEditNote}
                                    onClick={() => {
                                      setEditIdx(v => {
                                        return v === idx ? -1 : idx
                                      });
                                    }}
                                    style={{ transition: '0.2s' }}
                                    opacity="0"
                                    _groupHover={{ opacity: "1" }}
                                  />
                                  <Icon
                                    as={MdOutlineClose}
                                    onClick={() => {
                                      onRemoveSection(idx);
                                    }}
                                    style={{ transition: '0.2s' }}
                                    opacity="0"
                                    _groupHover={{ opacity: "1" }}
                                  />
                                </Flex>
                              </Flex>
                              <MessageSection
                                data={s}
                                idx={idx}
                                onEdit={editIdx === idx}
                                onEditSection={onEditSection}
                              />
                            </Box>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <br />
            <Accordion allowMultiple width="100%">
              <AccordionItem>
                <AccordionButton p="2px 4px">
                  <Box flex="1" textAlign="left">Add more</Box><AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <SimpleGrid columns={2} spacing={2} width="100%">
                    <ListItem
                      title="Text message"
                      icon={BsTextareaT}
                      onClick={() => {
                        onNewSection("text");
                      }}
                    />
                    <ListItem
                      title="Image message"
                      icon={BsImage}
                      onClick={() => {
                        onNewSection("img");
                      }}
                    />
                    <ListItem
                      title="Carousel message"
                      icon={BiCarousel}
                      onClick={() => {
                        onNewSection("carousel");
                      }}
                    />
                    <ListItem
                      title="Menu message"
                      icon={BsGrid1X2}
                      onClick={() => {
                        onNewSection("menu");
                      }}
                    />
                  </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>

          <ModalFooter>
            <Button size="sm" onClick={onSave} colorScheme="blue" mr={3}>Save</Button>
            <Button size="sm" onClick={() => {
              onCancel();
              onClose();
            }}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

const ListItem = ({ title, type, icon, ...rest }) => {
  return (
    <Box _hover={{ bg: "var(--chakra-colors-gray-200)" }} p="2px 10px" shadow="md" borderWidth="1px" borderRadius="6px" {...rest} >
      <Icon as={icon} /> <Text display="inline" fontSize="sm">{title}</Text>
    </Box>
  )
}

export default State;
