import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return null;
    },
  },
});

export const { clearNotification, setNotification } = notificationSlice.actions;

const notificationReducer = notificationSlice.reducer;
export default notificationReducer;
