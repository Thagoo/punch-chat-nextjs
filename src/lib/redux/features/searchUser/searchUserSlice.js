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
    searchResult: null,
  },
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchUsers.fulfilled, (state, action) => {
      state.searchResult = action.payload;
    });
  },
});

export const { setSearchResult } = searchUserSlice.actions;
export const selectSearchResult = (state) => state.searchUser.searchResult;
