import React, { useState, useEffect } from 'react'
import { Stack } from '@chakra-ui/react'
import StoreName from '../components/StoreInfo/StoreName'
import Infomation from '../components/StoreInfo/Infomation'
import Description from '../components/StoreInfo/Description'
import { getStoreInfo } from '../store/action';

export default function StoreInfo() {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('')
  const [description, setDescription] = useState('');
  const [info, setInfo] = useState({
    opening_hours: ['', ''],
    phone_num: '',
    location: '',
    category: []
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await getStoreInfo();
      setName(res.name);
      setIcon(res.icon);
      setDescription(res.description)
      setInfo({
        opening_hours: [res.opening_hours.split('~')[0], res.opening_hours.split('~')[1]],
        phone_num: res.phone_num,
        location: res.location,
        category: res.category.split('.')
      })
    }
    fetchData();
  }, [])
  return (
    <Stack
      px={10}
      py={5}
      flexGrow={1}
      spacing={8}
    >
      <StoreName name={name} icon={icon} />
      <Infomation info={info} setInfo={setInfo} />
      <Description description={description} setDescription={setDescription} />
    </Stack>
  )
}
