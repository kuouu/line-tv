import React, { useState } from 'react'
import { Flex, OrderedList, ListItem, Text, Select } from '@chakra-ui/react'
import styled from 'styled-components'

const data = [
  {
    question: 'gender',
    reply: [
      {
        title: 'male',
        num: 45
      },
      {
        title: 'female',
        num: 66
      }
    ],
  },
  {
    question: 'age',
    reply: [
      {
        title: '10~17',
        num: 33
      },
      {
        title: '18~25',
        num: 78
      },
      {
        title: '26~35',
        num: 65
      },
      {
        title: '36~45',
        num: 45
      },
      {
        title: '46~55',
        num: 35
      },
      {
        title: '56~65',
        num: 74
      },
      {
        title: '66~75',
        num: 23
      },
      {
        title: '76~85',
        num: 12
      },
      {
        title: '86~95',
        num: 3
      },
      {
        title: '96~105',
        num: 1
      },
      {
        title: '106~115',
        num: 0
      },
      {
        title: '116~125',
        num: 0
      },
      {
        title: '126~135',
        num: 0
      }
    ],
  }
]

export default function ReplyStat() {
  const [selected, setSelected] = useState();
  const handleOnChange = (e) => {
    setSelected(e.target.value);
  }
  return (
    <Flex
      w='45%'
      direction='column'
      bgColor='white'
      border='solid 1px #e3e3e3'
      borderRadius={3}
      maxH='400px'
      minH='400px'
    >
      <Flex bgColor='#fafafa' p={3} justify='space-between'>
        <Text fontWeight='semibold'>Reply Statistic</Text>
        <Select
          w='50%'
          h='100%'
          bgColor='white'
          placeholder="Select option"
          value={selected}
          onChange={handleOnChange}
        >
          {data.map((d, index) => <option value={index} key={d.question}>
            {d.question}
          </option>)}
        </Select>
      </Flex>
      <OrderedList m={0} overflow='scroll'>
        {selected && data[selected].reply.map(option => <CustomListItem key={option.title}>
          <Flex h='100%' px={3} justify='space-between' align='center'>
            <Text>{option.title}</Text>
            <Text>{option.num}</Text>
          </Flex>
        </CustomListItem>)}
      </OrderedList>
    </Flex>
  )
}

const CustomListItem = styled(ListItem)`
  height: 40px;
  list-style: none;
  border-bottom: solid 1px #e3e3e3;
  :hover{
    background-color: rgba(0, 112, 188, 0.05);
  }
`
