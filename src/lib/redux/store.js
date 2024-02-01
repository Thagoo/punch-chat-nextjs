import { configureStore } from "@reduxjs/toolkit";
import { websocketSlice } from "./features/websocket/websocketSlice";
import { searchUserSlice } from "./features/searchUser/searchUserSlice";

export const store = configureStore({
  reducer: {
    websocket: websocketSlice.reducer,
    searchUser: searchUserSlice.reducer,
  },
});
