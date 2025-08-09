import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    removeMessage(state, action) {
      return "";
    },
  },
});

const notificationReducer = notificationSlice.reducer;
export const { setMessage, removeMessage } = notificationSlice.actions;

export default notificationReducer;
