import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    likeBlog(state, action) {
      const updatedBlog = action.payload;
      const updatedBlogs = state.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b,
      );
      updatedBlogs.sort((a, b) => b.likes - a.likes);
      return updatedBlogs;
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
  },
});

export const { setBlogs, appendBlog, likeBlog, deleteBlog } = blogSlice.actions;

const blogReducer = blogSlice.reducer;
export default blogReducer;
