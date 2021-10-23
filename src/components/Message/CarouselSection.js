import React, { useState } from 'react'
import { Flex, HStack, Image, Input, Stack, Text } from '@chakra-ui/react'
import { MdAddCircleOutline } from 'react-icons/md';
import { upload } from '../../store/action'

export default function CarouselSection({ data, onEdit, editHandler }) {
  const contents = data.content;
  const [urls, setUrls] = useState(data.content.map(e => e.url))
  const ImagePlaceHolder = () => <Flex
    minW='300px'
    h='100%'
    justify='center'
    align='center'
    bgColor='rgba(255, 255, 255, 0.5)'
    borderRadius='5px'
    cursor='pointer'
  >
    {onEdit && <input
      style={{ width: 0, opacity: 0 }}
      display='none'
      type='file'
      id={`imgupload_${data.content.length}`}
      onChange={async e => {
        const newUrl = await upload(e.target.files[0]);
        setUrls(urlState => {
          const newState = [...urlState, newUrl];
          const newContent = [...contents, {
            url: newUrl,
            buttons: [
              {
                text: "text",
                edgeTo: ""
              }
            ]
          }]
          editHandler(["content"], [newContent]);
          return newState;
        });
      }} />}
    <label htmlFor={`imgupload_${data.content.length}`}>
      <MdAddCircleOutline fontSize='40px' cursor='pointer'/>
    </label>
  </Flex>
  return (
    <HStack h='300px' overflowX='scroll' spacing={10}>
      {contents && contents.map((content, index) => <Stack
        key={content.url}
        minW='300px'
        h='100%'
        justify='center'
        align='center'
        borderRadius='5px'
        position='relative'
        overflow='hidden'
        bgColor='rgba(255, 255, 255, 0.5)'
      >
        {onEdit && <input
          style={{ height: 0, opacity: 0 }}
          display='none'
          type='file'
          id={`imgupload_${index}`}
          onChange={async e => {
            const newUrl = await upload(e.target.files[0]);
            setUrls(urlState => {
              urlState[index] = newUrl;
              const newContent = contents.map((content, idx) => ({ ...content, url: urlState[idx] }));
              editHandler(["content"], [newContent]);
              return urlState;
            });
          }} />}
        <label htmlFor={`imgupload_${index}`}>
          <Image
            src={content.url}
            cursor={onEdit ? 'pointer' : 'default'}
          />
        </label>
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
