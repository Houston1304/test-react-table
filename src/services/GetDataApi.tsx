import axios from "axios";

const API_URL =
  "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/get";

export const fetchTableData = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      "x-auth": localStorage.getItem("token"),
    },
  });

  return response.data.data;
};
