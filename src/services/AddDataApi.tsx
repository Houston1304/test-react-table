import axios from "axios";

const API_URL =
  "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/create";

export const addData = async (data: any) => {
  const response = await axios.post(API_URL, data, {
    headers: {
      "x-auth": localStorage.getItem("token"),
    },
  });

  return response.data.data;
};
