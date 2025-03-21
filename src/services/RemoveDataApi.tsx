import axios from "axios";

const API_URL =
  "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/delete";

export const removeData = async (id: string) => {
  await axios.post(
    `${API_URL}/${id}`,
    {},
    {
      headers: {
        "x-auth": localStorage.getItem("token"),
      },
    }
  );
};
