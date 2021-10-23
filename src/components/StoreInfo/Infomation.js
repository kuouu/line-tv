import React, { useState, useEffect } from 'react'
import { Flex, Text, Input, Stack, HStack, Tag, TagCloseButton } from '@chakra-ui/react'

export default function Infomation({ info, setInfo }) {
  console.log(info.category)
  const setTags = (newTags) => {
    setInfo({...info, category: newTags})
  }
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
    if (info.category.length >= 5) return;
    const newTag = e.target.value
    setTags([...info.category, newTag])
    e.target.value = ''
  }
  const deleteTag = (key) => {
    const newTags = info.category.filter(tag => tag !== key)
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
              value={info.opening_hours[0]}
              onChange={e => setInfo({
                ...info,
                opening_hours: [e.target.value, info.opening_hours[1]]
              })}
            />
            <Text>~</Text>
            <Input
              type='time'
              value={info.opening_hours[1]}
              onChange={e => setInfo({
                ...info,
                opening_hours: [info.opening_hours[0], e.target.value]
              })}
            />
          </HStack>
        </Stack>
        <Stack>
          <Text>Phone Number:</Text>
          <Input
            maxW='600px'
            type='tel'
            placeholder='09XX-XXX-XXX'
            value={info.phone_num}
            onChange={e => setInfo({ ...info, phone_num: e.target.value })}
          />
        </Stack>
        <Stack>
          <Text>Location:</Text>
          <Input
            maxW='600px'
            placeholder='somewhere'
            value={info.location}
            onChange={e => setInfo({ ...info, location: e.target.value })}
          />
        </Stack>
      </Stack>
      <Stack w='48%'>
        <Flex w='100%' justify='space-between'>
          <Text>Tags:</Text>
          <Text>{`${info.category.length}/5`}</Text>
        </Flex>
        <Input onBlur={handleOnBlur} onKeyPress={handleEnter} />
        <Flex wrap='wrap'>
          {info.category.length > 0 && info.category.map(tag => <Tag m='5px' colorScheme='cyan' key={tag}>
            <Text isTruncated>{tag}</Text>
            <TagCloseButton onClick={() => deleteTag(tag)} />
          </Tag>)
          }
        </Flex>
      </Stack>
    </Flex>
  )
}
