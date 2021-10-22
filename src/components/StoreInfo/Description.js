import React from 'react'
import { Stack, Text, Textarea } from '@chakra-ui/react'

export default function Description() {
  return (
    <Stack
      bgColor='#fafafc'
      border='solid 1px #e3e3e3'
      borderRadius={3}
      p={3}
      flexGrow={1}
    >
      <Text>Description:</Text>
      <Textarea h='100%' resize='none'/>
    </Stack>
  )
}
