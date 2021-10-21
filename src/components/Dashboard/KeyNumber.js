import { Flex, Stack, Text } from '@chakra-ui/layout'
import React from 'react'

export default function KeyNumber() {
  const DisplayNumber = ({title, number}) => <Stack minW='300px'>
    <Text fontSize='md' color='rgba(0, 0, 0, 0.45)'>
      {title}
    </Text>
    <Text fontSize='lg' fontWeight='semibold'>
      {number}
    </Text>
  </Stack>
  return (
    <Flex
      direction='column'
      bgColor='white'
      border='solid 1px #e3e3e3'
      borderRadius={3}
    >
      <Flex bgColor='#fafafa' p={3} fontWeight='semibold'>
        Key Number
      </Flex>
      <Flex p={3}>
        <DisplayNumber title={'Today\'s Customer'} number={13}/>
        <DisplayNumber title={'Customer in last 7 days'} number={132}/>
        <DisplayNumber title={'Cumulative Customer'} number={1782}/>
      </Flex>
      <Flex p={3}>
        <DisplayNumber title={'Today\'s Reply'} number={36}/>
        <DisplayNumber title={'Reply in last 7 days'} number={448}/>
        <DisplayNumber title={'Reply Customer'} number={3360}/>
      </Flex>
    </Flex>
  )
}
