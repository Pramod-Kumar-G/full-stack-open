import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer.js";
import { Box } from "@mui/material";
import Blogs from "./Blogs.jsx";

const BlogDetails = () => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const handleCreate = async (blog) => {
    ref.current.toggleVisibility();
    dispatch(createBlog(blog));
  };
  return (
    <Box sx={{ mt: 3 }}>
      <Togglable buttonLabel="Create New Blog" ref={ref}>
        <BlogForm createBlog={handleCreate} />
      </Togglable>
      <Blogs />
    </Box>
  );
};

export default BlogDetails;
