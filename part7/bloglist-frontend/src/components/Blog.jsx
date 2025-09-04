import { useState } from "react";
import { useSelector } from "react-redux";

const Blog = ({ blog, handleUpdate, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const user = useSelector((state) => state.user);
  const [isVisible, setIsVisible] = useState(false);
  const showWhenVisible = { display: isVisible ? "" : "none" };
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
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
