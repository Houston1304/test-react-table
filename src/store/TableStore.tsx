import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "../reducers/TableSlice";

const store = configureStore({
  reducer: {
    table: tableReducer,
  },
});

export default store;
