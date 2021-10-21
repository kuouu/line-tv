import React from 'react'
import { Stack, Text, Flex } from '@chakra-ui/layout'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { MdOutlineLiveTv } from "react-icons/md";

export default function Sidebar() {

  return (
    <Stack w='200px' p='20px' color="white" backgroundColor='#282c34' spacing={3}>
      <Link to='/'>
        <Flex align='center'>
          <MdOutlineLiveTv fontSize='1.5rem'/>
          <LogoText>Line TV</LogoText>
        </Flex>
      </Link>

      <LinkText to='./dashboard'>Dashboard</LinkText>
      <LinkText to='./storeinfo'>Store Info</LinkText>
      <LinkText to='./boteditor'>Bot Editor</LinkText>
    </Stack>
  )
}

const LogoText = styled(Text)`
  margin-left: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
`

const LinkText = styled(Link)`
  :hover{
    color: #61dafb;
  }
`
