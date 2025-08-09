import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
  },
});

const notificationReducer = notificationSlice.reducer;
export const { setMessage } = notificationSlice.actions;

export default notificationReducer;
