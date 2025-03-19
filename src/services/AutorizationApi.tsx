import axios from "axios";

const API_URL =
  "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/login";

export const login = async (username: string, password: string) => {
  const response = await axios.post(API_URL, { username, password });
  return response.data;
};
