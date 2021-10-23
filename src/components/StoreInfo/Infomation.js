import React, { useState } from 'react'
import { Flex, Text, Input, Stack, HStack, Tag, TagCloseButton } from '@chakra-ui/react'

export default function Infomation() {
  const [tags, setTags] = useState([]);
  const handleOnBlur = (e) => {
    if (e.target.value === '') return;
    addNewTag(e);
  }
  const handleEnter = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      addNewTag(e);
    }
  }
  const addNewTag = (e) => {
    if(tags.length >= 5) return;
    const newTag = e.target.value
    setTags([...tags, newTag])
    e.target.value = ''
  }
  const deleteTag = (key) => {
    const newTags = tags.filter(tag => tag !== key)
    setTags(newTags);
  }
  return (
    <Flex
      bgColor='#fafafc'
      justify='space-between'
      border='solid 1px #e3e3e3'
      borderRadius={3}
      p={3}
    >
      <Stack spacing={6} w='48%'>
        <Stack >
          <Text mb="8px">Business Hours:</Text>
          <HStack maxW='600px'>
            <Input
              type='time'
            />
            <Text>~</Text>
            <Input
              type='time'
            />
          </HStack>
        </Stack>
        <Stack>
          <Text>Phone Number:</Text>
          <Input
            maxW='600px'
            type='tel'
            placeholder='09XX-XXX-XXX'
          />
        </Stack>
        <Stack>
          <Text>Location:</Text>
          <Input
            maxW='600px'
            placeholder='somewhere'
          />
        </Stack>
      </Stack>
      <Stack w='48%'>
        <Flex w='100%' justify='space-between'>
          <Text>Tags:</Text>
          <Text>{`${tags.length}/5`}</Text>
        </Flex>
        <Input onBlur={handleOnBlur} onKeyPress={handleEnter} />
        <Flex wrap='wrap'>
          {tags.map(tag => <Tag m='5px' colorScheme='cyan' key={tag}>
            <Text isTruncated>{tag}</Text>
            <TagCloseButton onClick={() => deleteTag(tag)} />
          </Tag>)
          }
        </Flex>
      </Stack>
    </Flex>
  )
}
