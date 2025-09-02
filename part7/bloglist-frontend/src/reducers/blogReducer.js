import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

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

export const createBlog = (blog) => {
  return async (dispatch) => {
    const savedBlog = await blogService.createBlog(blog);
    dispatch(appendBlog(savedBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(deleteBlog(id));
  };
};
export const updateLikes = (blog) => {
  return async (dispatch) => {
    const blogData = {
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    const updatedBlog = await blogService.updateBlog(blog.id, blogData);
    dispatch(likeBlog(updatedBlog));
  };
};
