import React, { useState } from 'react'

import { 
  Text,
  Stack, 
  Button,
  Textarea,
  Input
} from '@chakra-ui/react'

const TextSection = ({data, onEdit, editHandler}) => {
  const [content, setContent] = useState(data.content);
  const [buttons, setButtons] = useState(data.buttons);

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
      {data.buttons.map((b, idx) => {
        return (
          <Button colorScheme="blackAlpha" role="group" key={idx}>
            {
              onEdit ? 
                <Input defaultValue={b.text} bg={"#fff"} color={"#000"} style={{textAlign: "center", height: "60%", borderRadius: "3px"}} 
                  onChange={(e) => {
                    setButtons((bs) => {
                      bs[idx] = {
                        ...bs[idx],
                        text: e.target.value
                      };
                      editHandler(["buttons"], [bs]);
                      return bs;
                    });
                  }}
                /> :
                <Text>{buttons[idx].text}</Text>
            }
          </Button>
        )
      })}
    </Stack>
  )
}

export default TextSection
