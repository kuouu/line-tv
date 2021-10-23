import axios from 'axios';

const API_KEY = "eeb0a3a67ea2c64";
const HWID = "0153a4ceb5";

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
