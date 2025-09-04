import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";
import { removeBlog, updateLikes } from "../reducers/blogReducer.js";

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!blog) return null;

  const handleUpdate = async (blog) => {
    try {
      dispatch(updateLikes(blog));
      dispatch(
        setNotification({
          message: `Blog '${blog.title}' was liked`,
          type: "success",
        }),
      );
      setTimeout(() => dispatch(clearNotification()), 3000);
    } catch (error) {
      dispatch(
        setNotification({
          message: "Error updating blog",
          type: "error",
        }),
      );
      setTimeout(() => dispatch(clearNotification()), 3000);
    }
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
      navigate("/");
    }
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>

      <div className="togglableContent">
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes
          <button
            onClick={() => handleUpdate({ ...blog, likes: blog.likes + 1 })}
          >
            like
          </button>
        </div>
        <div>Added by {blog.user.name}</div>
        {blog.user.username === user.username && (
          <div>
            <button onClick={() => handleDelete(blog)}>remove</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
