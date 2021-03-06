import React from 'react'
import { Flex } from '@chakra-ui/layout'
import KeyNumber from '../components/Dashboard/KeyNumber'
import CustomerChart from '../components/Dashboard/CustomerChart'
import ReplyStat from '../components/Dashboard/ReplyStat'

export default function Dashboard() {
  return (
    <Flex
      px={10}
      py={5}
      flexGrow={1}
      direction='column'
      justify='space-between'
    >
      <KeyNumber />
      <Flex mt={5} justify='space-between'>
        <CustomerChart />
        <ReplyStat />
      </Flex>
    </Flex>
  )
}
