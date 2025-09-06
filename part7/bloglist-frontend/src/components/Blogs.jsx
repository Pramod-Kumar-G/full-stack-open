import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <div>
      {blogs.map((blog) => (
        <Paper key={blog.id} sx={{ padding: 2, margin: 2 }}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </Paper>
      ))}
    </div>
  );
};

export default Blogs;
