import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  return (
    <div style={{ display: notification.message === "" ? "" : "block" }}>
      <Alert severity={notification.severity} sx={{ marginTop: 2 }}>
        {notification.message}
      </Alert>
    </div>
  );
};

export default Notification;
