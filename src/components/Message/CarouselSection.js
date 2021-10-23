import React, { useState } from 'react'
import { Flex, HStack, Image, Input, Stack, Text } from '@chakra-ui/react'
import { MdAddCircleOutline } from 'react-icons/md';

export default function CarouselSection({ data, onEdit, editHandler }) {
  const [contents, setContents] = useState(data.content);
  const ImagePlaceHolder = () => <Flex
    minW='300px'
    h='100%'
    justify='center'
    align='center'
    bgColor='rgba(255, 255, 255, 0.5)'
    borderRadius='5px'
    cursor='pointer'
  >
    <MdAddCircleOutline fontSize='40px' />
  </Flex>
  return (
    <HStack h='300px' overflowX='scroll' spacing={5}>
      {contents && contents.map(content => <Stack
        minW='300px'
        h='100%'
        justify='center'
        align='center'
        borderRadius='5px'
        position='relative'
      >
        <Image src={content.url} cursor='pointer'/>
        <Flex
          px={5}
          py={2}
          position='absolute'
          bottom='20px'
          borderRadius='20px'
          color='white'
          bgColor='rgba(0,0,0,0.5)'
          h='40px'
        >
          {onEdit
            ? <Input
              w='80px'
              maxH='100%'
              textAlign='center'
              variant="flushed"
            />
            : <Text>test</Text>}
        </Flex>
      </Stack>)}
      {onEdit && <ImagePlaceHolder />}
    </HStack>
  )
}
