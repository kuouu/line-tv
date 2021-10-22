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
import { MdOutlineDragIndicator } from "react-icons/md"

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import MessageSection, { MessageTypeMap } from "../Message";
import states from '../../store/state';

const State = ({id, onDelete}) => {
  let stateData = states.find(s => s.id === id);
  const [sections, setSections] = useState(stateData?.sections || []);
  const [title, setTitle] = useState(stateData?.title || "");
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  return (
    <>
      <VStack onClick={onOpen}>
        <Flex width="100%" alignItems="center">
          <Box padding="0 8px">{title}</Box>
          <Spacer />
          <CloseButton size="sm" onClick={() => {
            onDelete(id);
          }} />
        </Flex>
        {/* {sections.map((s, idx) => <Box key={idx}>{s.type}</Box>)} */}
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
                    {sections.map((s, idx) => (
                      <Draggable key={idx} draggableId={`${id}_${idx}`} index={idx}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <Box 
                              p="6px 10px"
                              _hover={{bg: '#EDF2F7', transition: '0.3s', borderRadius: '6px'}} 
                              role="group"
                              key={idx}
                            >
                              <Flex width="100%" alignItems="center">
                                <Text fontSize="sm" {...provided.dragHandleProps}>
                                  <Icon as={MdOutlineDragIndicator} width="0px" style={{transition: '0.2s'}} _groupHover={{ width: '12px' }} />
                                </Text>
                                <Text fontWeight="bold" fontSize="sm">{`#${idx + 1} ${MessageTypeMap[s.type]}`}</Text>
                              </Flex>
                              <MessageSection data={s}/>
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
                    />
                    <ListItem
                      title="Image message"
                      icon={BsImage}
                    />
                    <ListItem
                      title="Carousel message"
                      icon={BiCarousel}
                    />
                    <ListItem
                      title="Menu message"
                      icon={BsGrid1X2}
                    />
                  </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>

          <ModalFooter>
            <Button size="sm" colorScheme="blue" mr={3}>Save</Button>
            <Button size="sm" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const ListItem = ({ title, icon, ...rest }) => {
  return (
    <Box _hover={{ bg: "var(--chakra-colors-gray-200)" }} p="2px 10px" shadow="md" borderWidth="1px" borderRadius="6px" {...rest}>
      <Icon as={icon} /> <Text display="inline" fontSize="sm">{title}</Text>
    </Box>
  )
}

export default State;
