import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";
import { removeBlog, updateLikes } from "../reducers/blogReducer.js";
import { Box, Button, Paper, Typography } from "@mui/material";
import Comments from "./Comments";

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
          severity: "success",
        }),
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
    } catch (error) {
      dispatch(
        setNotification({
          message: "Error updating blog",
          severity: "error",
        }),
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
    }
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
      navigate("/");
    }
  };

  return (
    <Box sx={{ marginTop: 3 }}>
      <Paper sx={{ maxWidth: "450px", margin: "auto", padding: 4 }}>
        <Typography variant="h3" gutterBottom>
          {blog.title} {blog.author}
        </Typography>
        <div>
          <Typography variant="h6" gutterBottom>
            <a href={blog.url}>{blog.url}</a>
          </Typography>
          <div>
            <Typography variant="h6" gutterBottom>
              {blog.likes} likes
              <Button
                onClick={() => handleUpdate({ ...blog, likes: blog.likes + 1 })}
              >
                like
              </Button>
            </Typography>
          </div>
          <Typography variant="h6" gutterBottom>
            Added by {blog.user.name}
          </Typography>
          {blog.user.username === user.username && (
            <div>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleDelete(blog)}
              >
                remove
              </Button>
            </div>
          )}
        </div>
      </Paper>
      <Comments blog={blog} />
    </Box>
  );
};

export default Blog;
