import Blog from "./Blog";
import blogService from "../services/blogs";
import { useState, useEffect } from "react";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";
import {
  appendBlog,
  deleteBlog,
  likeBlog,
  setBlogs,
} from "../reducers/blogReducer.js";

const BlogDetails = ({ handleLogout, user }) => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const ref = useRef(null);

  useEffect(() => {
    blogService.getAll().then((blogsReturned) => {
      blogsReturned.sort((a, b) => b.likes - a.likes);
      dispatch(setBlogs(blogsReturned));
    });
  }, []);

  const handleUpdate = async (blog) => {
    try {
      const blogData = {
        user: blog.user.id,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      };

      const updatedBlog = await blogService.updateBlog(blog.id, blogData);
      dispatch(likeBlog(updatedBlog));
      dispatch(
        setNotification({
          message: `Blog '${updatedBlog.title}' was liked`,
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
        await blogService.deleteBlog(blog.id);
        // const updatedBlogs = blogs.filter((b) => b.id !== blog.id);
        // dispatch(setBlogs(updatedBlogs));
        dispatch(deleteBlog(blog.id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCreate = async (blog) => {
    ref.current.toggleVisibility();
    const savedBlog = await blogService.createBlog(blog);

    dispatch(appendBlog(savedBlog));
    dispatch(
      setNotification({
        message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
        type: "success",
      }),
    );
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div>
      <h4>
        {user.name} logged in
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </h4>
      <Togglable buttonLabel="create new blog" ref={ref}>
        <BlogForm createBlog={handleCreate} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          user={user}
        />
      ))}
    </div>
  );
};

export default BlogDetails;
