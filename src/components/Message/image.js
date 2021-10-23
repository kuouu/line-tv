import React, { useState } from 'react'
import { upload } from '../../store/action'

const ImageSection = ({data, onEdit, editHandler}) => {
  const [url, setUrl] = useState(data.url);

  return (
    <>
      <img src={url} style={{borderRadius: '6px'}} alt="" />
      <input type="file" style={{display: onEdit ? "block" : "none"}} onChange={async e => {
        let newUrl = await upload(e.target.files[0]);
        setUrl(newUrl);
        editHandler(["url"], [newUrl]);
      }}/>
    </>
  )
}

export default ImageSection
