import React, { useState } from 'react'
import {
  Text,
  Stack,
  Button,
  Textarea,
  Input,
  Flex
} from '@chakra-ui/react'
import { MdAddCircleOutline } from 'react-icons/md';

const TextSection = ({ data, onEdit, editHandler }) => {
  const [content, setContent] = useState(data.content);
  const [buttons, setButtons] = useState(data.buttons);
  const handleAddOnClick = () => {
    setButtons((bs) => {
      const newBtn = {
        text: "new button",
        edgeTo: ""
      }
      const newBtns = (bs === undefined ? [newBtn]: [...bs, newBtn])
      editHandler(["buttons"], [newBtns]);
      return newBtns;
    });
  }
  return (
    <Stack>
      {
        onEdit ?
          <Textarea
            fontSize="xs"
            defaultValue={content}
            bg={"#fff"}
            onChange={(e) => {
              setContent(e.target.value);
              editHandler(["content"], [e.target.value])
            }}
          /> :
          <Text fontSize="xs">{content}</Text>
      }
      {
        data.buttons ? 
          data.buttons.map((b, idx) => {
            return (
              <Button colorScheme="blackAlpha" role="group" key={idx}>
                {
                  onEdit ?
                    <Input defaultValue={b.text} bg={"#fff"} color={"#000"} style={{ textAlign: "center", height: "60%", borderRadius: "3px" }}
                      onChange={(e) => {
                        setButtons((bs) => {
                          bs[idx] = {
                            ...bs[idx],
                            text: e.target.value
                          };
                          console.log(["buttons"], [bs]);
                          editHandler(["buttons"], [bs]);
                          return bs;
                        });
                      }}
                    /> :
                    <Text>{buttons[idx].text}</Text>
                }
              </Button>
            )
          }) : 
          <></>
      }
      {onEdit && <Flex w='100%' p={1} justify='center'>
        <MdAddCircleOutline fontSize='20px' cursor='pointer' onClick={handleAddOnClick}/>
      </Flex>}
    </Stack>
  )
}

export default TextSection
