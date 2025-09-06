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
import NavBar from "./components/NavBar";
import Blogs from "./components/Blogs";

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

  return (
    <BrowserRouter>
      <NavBar />
      <div>{notification && <Notification />}</div>
      <Routes>
        <Route path="/" element={user ? <BlogDetails /> : <LoginForm />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/users/:id" element={<UserBlogs users={users} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
