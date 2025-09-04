import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";
import {
  addComment,
  removeBlog,
  updateLikes,
} from "../reducers/blogReducer.js";
import blogService from "../services/blogs";

const Blog = () => {
  const [comment, setComment] = useState("");
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
      S;
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    dispatch(addComment(id, comment));
    setComment("");
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>

      <div>
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
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
