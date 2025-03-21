import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableState {
  data: any[];
}

const initialState: TableState = {
  data: [],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<any>) => {
      state.data.push(action.payload);
    },

    removeRecord: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((record) => record.id !== action.payload);
    },

    editRecord: (state, action: PayloadAction<any>) => {
      const index = state.data.findIndex(
        (record) => record.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },

    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
  },
});

export const { addRecord, removeRecord, editRecord, setData } =
  tableSlice.actions;
export default tableSlice.reducer;
