import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "setNotification":
      return action.payload;
    case "clearNotification":
      return "";
    default:
      return state;
  }
};

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    "",
  );
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationValueAndDispatch = useContext(NotificationContext);
  return notificationValueAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationValueAndDispatch = useContext(NotificationContext);
  return notificationValueAndDispatch[1];
};

export default NotificationContext;
