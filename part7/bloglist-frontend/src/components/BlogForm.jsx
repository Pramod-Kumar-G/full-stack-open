import { Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (e) => {
    e.preventDefault();
    const blog = { title, author, url };
    createBlog(blog);
  };
  return (
    <div>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ marginTop: 6, marginBottom: 3, textAlign: "center" }}
      >
        Create New Blog
      </Typography>
      <Paper sx={{ maxWidth: "450px", margin: "auto", padding: 4 }}>
        <form onSubmit={addBlog}>
          <TextField
            label="Title"
            variant="outlined"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Author"
            variant="outlined"
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="URL"
            variant="outlined"
            type="text"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Create
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default BlogForm;
