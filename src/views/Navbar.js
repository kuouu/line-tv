import React from 'react'
import { Flex, Text, HStack } from '@chakra-ui/layout'
import { useLocation } from 'react-router';
import { MdPerson } from 'react-icons/md';

export default function Navbar() {
  const location = useLocation();
  const urlToPageName = {
    '/dashboard': 'Dashboard',
    '/storeinfo': 'Store Info',
    '/boteditor': 'Bot Editor'
  };
  return (
    <Flex
      w='100%'
      px={7}
      py={3}
      align='center'
      bgColor='white'
      justify='space-between'
    >
      <Text fontWeight='semibold' fontSize='2xl'>
        {urlToPageName[location.pathname]}
      </Text>
      <HStack align='center'>
        <MdPerson fontSize='1.5rem'/>
        <Text>今日店內人數：</Text>
        <Text>13</Text>
      </HStack>
    </Flex>
  )
}
