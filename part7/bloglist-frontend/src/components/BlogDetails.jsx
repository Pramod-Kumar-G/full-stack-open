import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";
import {
  createBlog,
  removeBlog,
  updateLikes,
} from "../reducers/blogReducer.js";

const BlogDetails = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const ref = useRef(null);

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
      try {
        dispatch(removeBlog(blog.id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCreate = async (blog) => {
    ref.current.toggleVisibility();
    dispatch(createBlog(blog));
  };

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={ref}>
        <BlogForm createBlog={handleCreate} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default BlogDetails;
