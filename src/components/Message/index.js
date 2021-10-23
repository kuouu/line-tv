import React from 'react'

import TextSection from './text';
import ImageSection from './image';

export const MessageTypeMap = {
  "text": "Send Text",
  "img": "Send Image"
}

const MessageSection = ({data, idx, onEdit, onEditSection}) => {
  const editHandler = (keys, values) => {
    keys.forEach((key, i) => {
      onEditSection(idx, key, values[i]);
    });
  }

  switch(data.type) {
    case "text": {
      return (
        <TextSection data={data} onEdit={onEdit} editHandler={editHandler} />
      )    
    }
    case "img": {
      return (
        <ImageSection data={data} onEdit={onEdit} editHandler={editHandler} />
      )    
    }
    default: {
      
    }
  }
}

export default MessageSection
