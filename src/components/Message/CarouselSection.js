import React from 'react'
import { Flex, HStack, Image, Input, Stack, Text } from '@chakra-ui/react'
import { MdAddCircleOutline } from 'react-icons/md';
import { upload } from '../../store/action'
import { v4 as uuidv4 } from 'uuid';

export default function CarouselSection({ data, onEdit, editHandler }) {
  const contents = data.content;
  const ImagePlaceHolder = () => {
    const id = `imgupload_${uuidv4()}`;
    return <Flex>
      {onEdit && <input
        style={{ width: 0, opacity: 0 }}
        display='none'
        type='file'
        id={id}
        onChange={async e => {
          const newUrl = await upload(e.target.files[0]);
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
        }} />}
      <label htmlFor={id}>
        <Flex
          minW='300px'
          h='300px'
          justify='center'
          align='center'
          bgColor='rgba(255, 255, 255, 0.5)'
          borderRadius='5px'
          cursor='pointer'
          _hover={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
        >
          <MdAddCircleOutline fontSize='40px' cursor='pointer' />
        </Flex>
      </label>
    </Flex>
  }
  return (
    <HStack h={contents.length !== 0 || onEdit ? '300px' : '0'} overflowX='scroll' spacing={10}>
      {contents && contents.map((content, index) => {
        const id = `imgupload_${uuidv4()}`;
        return <Stack
          key={index}
          minW='300px'
          h='100%'
          justify='center'
          align='center'
          borderRadius='5px'
          position='relative'
          overflow='hidden'
          bgColor='rgba(255, 255, 255, 0.5)'
          _hover={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
        >
          {onEdit && <input
            style={{ height: 0, opacity: 0 }}
            display='none'
            type='file'
            id={id}
            onChange={async e => {
              const newUrl = await upload(e.target.files[0]);
              const urls = data.content.map((e, idx) => idx === index ? newUrl : e.url);
              const newContent = contents.map((content, idx) => ({ ...content, url: urls[idx] }));
              editHandler(["content"], [newContent]);
            }} />}
          <label htmlFor={id}>
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
                value={content.buttons[0].text}
                onChange={(e) => {
                  const newBtn = [{
                    ...content.buttons[0],
                    text: e.target.value
                  }]
                  const newContent = contents.map(
                    (content, idx) => (
                      index === idx ? { ...content, buttons: newBtn } : content)
                  );
                  editHandler(["content"], [newContent])
                }
                }
              />
              : <Text>{content.buttons[0].text}</Text>}
          </Flex>
        </Stack>
      })}
      {onEdit && <ImagePlaceHolder />}
    </HStack>
  )
}
