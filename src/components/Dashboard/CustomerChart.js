import React from 'react'
import { Flex } from '@chakra-ui/layout'
import ReactECharts from 'echarts-for-react';

export default function CustomerChart() {
  const chartOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ],
    tooltip: {
      trigger: 'axis',
    }
  };
  return (
    <Flex
      w='50%'
      direction='column'
      bgColor='white'
      border='solid 1px #e3e3e3'
      borderRadius={3}
    >
      <Flex bgColor='#fafafa' p={3} fontWeight='semibold'>
        Traffic
      </Flex>
      <ReactECharts style={{height: '100%'}} option={chartOption} />
    </Flex>
  )
}
