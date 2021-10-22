import React from 'react'

const ImageSection = ({data}) => {
  return (
    <div>
      <img src={data.url} style={{borderRadius: '6px'}} alt="" />
    </div>
  )
}

export default ImageSection
