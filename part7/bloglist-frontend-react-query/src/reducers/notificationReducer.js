const notificationReducer = (state, action) => {
  switch (action.type) {
    case "setMessage":
      return action.payload;
    case "clearMessage":
      return null;
    default:
      return null;
  }
};

export default notificationReducer;
