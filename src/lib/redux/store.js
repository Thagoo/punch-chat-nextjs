import { configureStore } from "@reduxjs/toolkit";

import webSocketMiddleware from "./features/websocket/socketMiddleware";
import { searchUserSlice } from "./features/searchUser/searchUserSlice";
import { chatSlice } from "./features/chatSlice/chatSlice";

export const store = configureStore({
  reducer: {
    searchUser: searchUserSlice.reducer,
    chat: chatSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(webSocketMiddleware),
});
