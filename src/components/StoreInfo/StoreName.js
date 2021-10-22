import React from 'react'
import { HStack, Avatar, Text, Flex, Button } from '@chakra-ui/react'
import avatar from '../../images/avatar.png'

export default function StoreName() {
  return (
    <Flex w='100%' align='center' justify='space-between'>
      <HStack spacing={8}>
        <Avatar size="xl" name="ncku" src={avatar}/>
        <Text fontSize='4xl' fontWeight='bold'>成功大學店</Text>
      </HStack>
      <Button colorScheme="blue">Save</Button>
    </Flex>
  )
}
