import axios from 'axios';

const API_KEY = "eeb0a3a67ea2c64"

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
