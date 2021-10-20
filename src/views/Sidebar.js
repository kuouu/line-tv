import React from 'react'
import { Stack, Box } from '@chakra-ui/layout'
import { useHistory } from "react-router-dom";

export default function Sidebar() {
  const history = useHistory();
  const handleClick = (route) => {
    history.push(route);
  }

  return (
    <Stack w='200px' p='20px'>
      <Box onClick={ ()=>handleClick('./') }>Line TV</Box>
      <Box onClick={ ()=>handleClick('./dashboard') }>Dashboard</Box>
      <Box onClick={ ()=>handleClick('./storeinfo') }>Store Info</Box>
      <Box onClick={ ()=>handleClick('./boteditor') }>Bot Editor</Box>
    </Stack>
  )
}
