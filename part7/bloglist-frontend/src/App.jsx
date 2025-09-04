import { useEffect } from "react";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogDetails from "./components/BlogDetails";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./reducers/userReducer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import { initializeBlogs } from "./reducers/blogReducer";

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

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const handleLogout = () => {
    dispatch(setUser(null));
    window.localStorage.removeItem("loggedBlogappUser");
  };

  return (
    <BrowserRouter>
      <div>
        <h2>{user ? "Blogs" : "Log in to application"}</h2>
        {notification && <Notification notification={notification} />}
        <h4>
          {user?.name} logged in
          <button type="button" onClick={handleLogout}>
            logout
          </button>
        </h4>
      </div>
      <Routes>
        <Route path="/" element={user ? <BlogDetails /> : <LoginForm />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
