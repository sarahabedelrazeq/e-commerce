import axios from "axios";
import { DEFAULT_LANGUAGE, API_URL, GENERAL_TOKEN } from "constants";

const client = () => {
  return axios.create({
    baseURL: API_URL,
    responseType: "json",
    headers: {
      "Content-type": "application/json",
      Language: DEFAULT_LANGUAGE,
      Token: GENERAL_TOKEN,
    },
  });
};

export default client;
