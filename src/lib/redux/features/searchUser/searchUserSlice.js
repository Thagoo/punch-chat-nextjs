import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const searchUsers = createAsyncThunk(
  "user/searchUsers",
  async (term) => {
    try {
      const result = await fetch("/api/searchUser", {
        method: "POST",
        body: JSON.stringify({ term }),
      });
      if (result.status !== 200) {
        return null;
      }
      return result.json();
    } catch (error) {
      throw new Error(error);
      return error;
    }
  }
);

export const searchUserSlice = createSlice({
  name: "searchUser",
  initialState: {
    searchUser: null,
  },
  reducers: {
    setSearchUser: (state, action) => {
      state.searchUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchUsers.fulfilled, (state, action) => {
      state.searchUser = action.payload;
    });
  },
});

export const { setSearchUser } = searchUserSlice.actions;
export const selectSearchUser = (state) => state.searchUser.searchUser;
