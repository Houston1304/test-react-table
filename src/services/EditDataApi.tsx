import axios from "axios";
import SendRecordInterface from "../interfaces/SendRowInterface";

const API_URL =
  "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/set";

export const editData = async (id: string, data: SendRecordInterface) => {
  const response = await axios.post(`${API_URL}/${id}`, data, {
    headers: {
      "x-auth": localStorage.getItem("token"),
    },
  });

  return response.data.data;
};
