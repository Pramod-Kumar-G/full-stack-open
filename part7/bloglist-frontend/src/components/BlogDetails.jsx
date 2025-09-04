import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer.js";
import { Link } from "react-router-dom";

const BlogDetails = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const ref = useRef(null);

  const handleCreate = async (blog) => {
    ref.current.toggleVisibility();
    dispatch(createBlog(blog));
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={ref}>
        <BlogForm createBlog={handleCreate} />
      </Togglable>
      {blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogDetails;
