import React from 'react'

import TextSection from './text';
import ImageSection from './image';

export const MessageTypeMap = {
  "text": "Send Text",
  "img": "Send Image"
}

const MessageSection = ({data}) => {
  switch(data.type) {
    case "text": {
      return (
        <TextSection data={data} />
      )    
    }
    case "img": {
      return (
        <ImageSection data={data} />
      )    
    }
    default: {
      
    }
  }
}

export default MessageSection
