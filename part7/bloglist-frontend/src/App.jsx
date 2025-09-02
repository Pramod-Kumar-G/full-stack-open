import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogDetails from "./components/BlogDetails";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);

      dispatch(setUser(parsedUser));
      blogService.setToken(parsedUser.token);
    }
  }, []);

  const handleLogout = () => {
    dispatch(setUser(null));
    window.localStorage.removeItem("loggedBlogappUser");
  };

  return (
    <div>
      <h2>{user ? "Blogs" : "Log in to application"}</h2>
      {notification && <Notification notification={notification} />}
      {user ? (
        <BlogDetails handleLogout={handleLogout} user={user} />
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default App;
