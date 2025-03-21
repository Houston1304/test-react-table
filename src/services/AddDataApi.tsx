import axios from "axios";
import SendRecordInterface from "../interfaces/SendRowInterface";

const API_URL =
  "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/create";

export const addData = async (data: SendRecordInterface) => {
  const response = await axios.post(API_URL, data, {
    headers: {
      "x-auth": localStorage.getItem("token"),
    },
  });

  return response.data.data;
};
