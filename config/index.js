const axios = require("axios");

async function apiRequestAxios(url, payload, headers = "", method = "get") {
  try {
    /** call axous date fro any given urls */
    if (method == "get") {
      console.log("url", url)
    let data  = await axios.get(url, {
      params: payload,

      headers,
    })
    return data;

    }
    return await axios.post(url, payload);
  } catch (error) {
    /* Error Eceptiong loggin */
    console.log("error")
    return error;
  }
}
module.exports = {
  apiRequestAxios,
};
