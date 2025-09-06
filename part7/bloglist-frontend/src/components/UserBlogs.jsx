import { Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const UserBlogs = ({ users }) => {
  const id = useParams().id;
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  return (
    <Paper sx={{ maxWidth: "450px", margin: "auto", marginTop: 4, padding: 4 }}>
      <Typography variant="h3">{user.name}</Typography>
      <Typography variant="h6" sx={{ margin: 3 }}>
        Added Blogs
      </Typography>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </Paper>
  );
};

export default UserBlogs;
