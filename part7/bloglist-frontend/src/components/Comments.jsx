import { useDispatch } from "react-redux";
import { addComment } from "../reducers/blogReducer.js";
import { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

const Comments = ({ blog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    dispatch(addComment(blog.id, comment));
    setComment("");
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Paper sx={{ maxWidth: "450px", margin: "auto", padding: 4 }}>
        <Typography variant="h3" gutterBottom>
          Comments
        </Typography>
        <form onSubmit={handleCommentSubmit}>
          <TextField
            label="Comment"
            variant="outlined"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth type="submit">
            Add Comment
          </Button>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </Paper>
    </Box>
  );
};

export default Comments;
