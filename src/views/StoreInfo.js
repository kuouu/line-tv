import React from 'react'
import { Stack } from '@chakra-ui/react'
import StoreName from '../components/StoreInfo/StoreName'
import Infomation from '../components/StoreInfo/Infomation'
import Description from '../components/StoreInfo/Description'

export default function StoreInfo() {
  return (
    <Stack
      px={10}
      py={5}
      flexGrow={1}
      spacing={8}
    >
      <StoreName />
      <Infomation />
      <Description />
    </Stack>
  )
}
