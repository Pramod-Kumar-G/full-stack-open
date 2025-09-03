import { useEffect, useContext, useReducer } from "react";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogDetails from "./components/BlogDetails";
import { useNotificationValue } from "./context/NotificationContext";
import userReducer from "./reducers/userReducer";

const App = () => {
  const [user, dispatch] = useReducer(userReducer, null);
  const notification = useNotificationValue();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);

      dispatch({ type: "setUser", payload: parsedUser });
      blogService.setToken(parsedUser.token);
    }
  }, []);

  const handleLogout = () => {
    dispatch({ type: "setUser", payload: null });
    window.localStorage.removeItem("loggedBlogappUser");
  };

  return (
    <div>
      <h2>{user ? "Blogs" : "Log in to application"}</h2>
      {notification && <Notification />}
      {user ? (
        <BlogDetails handleLogout={handleLogout} user={user} />
      ) : (
        <LoginForm dispatch={dispatch} />
      )}
    </div>
  );
};

export default App;
