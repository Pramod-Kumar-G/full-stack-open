import { useEffect, useState } from "react";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogDetails from "./components/BlogDetails";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./reducers/userReducer";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import { initializeBlogs } from "./reducers/blogReducer";
import UserBlogs from "./components/UserBlogs";
import { getAllUsers } from "./services/users";
import Blog from "./components/Blog";

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

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers().then((users) => setUsers(users));
  }, []);

  const handleLogout = () => {
    dispatch(setUser(null));
    window.localStorage.removeItem("loggedBlogappUser");
  };

  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          gap: "1.4em",
          backgroundColor: "lightgrey",
          padding: "0.5em",
        }}
      >
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
        {user && (
          <div>
            {user.name} logged in{" "}
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </div>
        )}
      </div>
      <div>
        <h2>{user ? "Blog App" : "Log in to application"}</h2>
        {notification && <Notification notification={notification} />}
      </div>
      <Routes>
        <Route path="/" element={user ? <BlogDetails /> : <LoginForm />} />
        <Route path="/users/:id" element={<UserBlogs users={users} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
