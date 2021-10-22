import React from 'react'

import { 
  Text,
  Stack, 
  Button,
  Icon,
  Flex
} from '@chakra-ui/react'

import { HiArrowNarrowRight } from 'react-icons/hi'

const TextSection = ({data}) => {
  return (
    <Stack>
      <Text fontSize="xs">{data.content}</Text>
      {data.buttons.map((b, idx) => {
        return (
          <Button colorScheme="blackAlpha" role="group" key={idx}>
            <Flex 
              alignItems="center" 
              justifyContent="space-evenly" 
              width="100%"
            >
              <Text>{b.text}</Text>
              <Icon as={HiArrowNarrowRight}/>
              <Text>{b.edgeTo}</Text>
            </Flex>
          </Button>
        )
      })}
    </Stack>
  )
}

export default TextSection
