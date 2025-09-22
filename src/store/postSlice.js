// postSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    clearPosts: (state) => {
      state.posts = [];
    },
  },
});

export const { addPost, removePost, clearPosts } = postSlice.actions;
export default postSlice.reducer;
