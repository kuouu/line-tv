import React from 'react'
import { HStack, Avatar, Text, Flex, Button } from '@chakra-ui/react'

export default function StoreName({ name, icon, submit }) {
  return (
    <Flex w='100%' align='center' justify='space-between'>
      <HStack spacing={8}>
        <Avatar size="xl" name="ncku" src={icon} />
        <Text fontSize='4xl' fontWeight='bold'>{name}</Text>
      </HStack>
      <Button colorScheme="blue" onClick={submit}>Save</Button>
    </Flex>
  )
}
