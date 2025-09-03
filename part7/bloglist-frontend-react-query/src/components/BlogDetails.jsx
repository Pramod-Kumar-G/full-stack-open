import Blog from "./Blog";
import blogService from "../services/blogs";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useRef } from "react";
import { useNotificationDispatch } from "../context/NotificationContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BlogDetails = ({ handleLogout, user }) => {
  const ref = useRef(null);
  const notificationDispatch = useNotificationDispatch();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  const queryclient = useQueryClient();

  const createBlogmutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (savedBlog) => {
      const blogs = queryclient.getQueryData(["blogs"]);
      queryclient.setQueryData(["blogs"], blogs.concat(savedBlog));
      notificationDispatch({
        type: "setMessage",
        payload: {
          message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
          type: "success",
        },
      });
      setTimeout(() => notificationDispatch({ type: "clearMessage" }), 3000);
    },
  });

  if (result.isPending) {
    return <div>loading...</div>;
  }

  const blogs = result.data;

  const handleCreate = async (blog) => {
    ref.current.toggleVisibility();
    createBlogmutation.mutate(blog);
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
        <BlogForm handleCreate={handleCreate} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default BlogDetails;
