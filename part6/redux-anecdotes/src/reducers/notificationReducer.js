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

export const setNotification = (message, displayTime) => {
  return async (dispatch) => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(removeMessage());
    }, displayTime * 1000);
  };
};

const notificationReducer = notificationSlice.reducer;
export const { setMessage, removeMessage } = notificationSlice.actions;

export default notificationReducer;
