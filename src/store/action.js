import axios from 'axios';

const API_KEY = "eeb0a3a67ea2c64";
const HWID = "0154054369";

export const upload = async (path) => {
  let formData = new FormData();
  formData.append("image", path);

  try {
    let res = await axios({
      method: 'POST',
      url: 'https://api.imgur.com/3/image',
      data: formData,
      headers: {
        Authorization: `Client-ID ${API_KEY}`
      },
      mimeType: 'multipart/form-data'
    });

    return res.data.data.link;
  } catch (e) {
    console.log(e)
  }

}

export const getStoreInfo = async () => {

  try {
    let res = await axios({
      method: 'get',
      url: 'http://34.80.76.67:8000/shops/1',
      headers: {
        'Content-type': 'application/json'
      },
    });

    return res.data;
  } catch (e) {
    console.log(e)
  }
}

export const postStoreInfo = async (data) => {
  try {
    let res = await axios({
      method: 'post',
      url: 'http://34.80.76.67:8000/shops',
      data,
      headers: {
        'Content-type': 'application/json'
      },
    });
    return res.data;
  } catch (e) {
    console.log(e)
  }
}
export const getFSM = async (hwid = HWID) => {
  try {
    let res = await axios({
      method: "GET",
      url: `http://34.80.76.67:8000/fsm/${hwid}`,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
}

export const postFSM = async (node_id, data, hwid = HWID) => {
  try {
    await axios({
      method: "POST",
      url: 'http://34.80.76.67:8000/fsm/node',
      data: {
        hwid,
        node_id,
        data: JSON.stringify(data)
      }
    })
  } catch (e) {
    console.log(e);
  }
}

export const deleteFSM = async (node_id, hwid = HWID) => {
  try {
    await axios({
      method: "DELETE",
      url: 'http://34.80.76.67:8000/fsm/node',
      data: {
        hwid,
        node_id
      }
    })
  } catch (e) {
    console.log(e);
  }
}
