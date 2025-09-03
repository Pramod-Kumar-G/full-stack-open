import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../context/NotificationContext";

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const notificationDispatch = useNotificationDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const showWhenVisible = { display: isVisible ? "" : "none" };
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const queryClient = useQueryClient();
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (_, id) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((b) => b.id !== id),
      );
    },
    onError: (error) => console.log(error),
  });
  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };
  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const updatedBlogs = blogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b,
      );
      queryClient.setQueryData(
        ["blogs"],
        updatedBlogs.sort((a, b) => b.likes - a.likes),
      );
      notificationDispatch({
        type: "setMessage",
        payload: {
          message: `Blog '${updatedBlog.title}' was liked`,
          type: "success",
        },
      });
      setTimeout(() => notificationDispatch({ type: "clearMessage" }), 3000);
    },
    onError: () => {
      notificationDispatch({
        type: "setMessage",
        payload: { message: "Error updating blog", type: "error" },
      });
      setTimeout(() => notificationDispatch({ type: "clearMessage" }), 3000);
    },
  });

  const handleUpdate = async (blog) => {
    const blogData = {
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    updateBlogMutation.mutate(blogData);
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{isVisible ? "hide" : "view"}</button>
      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button
            onClick={() => handleUpdate({ ...blog, likes: blog.likes + 1 })}
          >
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
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
