import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { clearNotification, setNotification } from "./notificationReducer";
import { useNavigate } from "react-router-dom";

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
    appendComment(state, action) {
      const id = action.payload.id;
      const comment = action.payload.comment;
      const updatedBlogs = state.map((b) =>
        b.id === id ? { ...b, comments: [...b.comments, comment] } : b,
      );
      return updatedBlogs;
    },
  },
});

export const { setBlogs, appendBlog, likeBlog, deleteBlog, appendComment } =
  blogSlice.actions;

const blogReducer = blogSlice.reducer;
export default blogReducer;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const savedBlog = await blogService.createBlog(blog);
      dispatch(appendBlog(savedBlog));
      dispatch(
        setNotification({
          message: `a new blog ${blog.title} by ${blog.author} added`,
          type: "success",
        }),
      );
      setTimeout(() => clearNotification(), 3000);
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id);
      dispatch(deleteBlog(id));
    } catch (error) {
      console.log(error);
    }
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

    try {
      const updatedBlog = await blogService.updateBlog(blog.id, blogData);
      dispatch(likeBlog(updatedBlog));
    } catch (error) {
      console.log(error);
    }
  };
};
export const addComment = (id, comment) => {
  return async (dispatch) => {
    await blogService.addComment(id, { comment });
    dispatch(appendComment({ id, comment }));
  };
};
