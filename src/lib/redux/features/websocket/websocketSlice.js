import { createSlice } from "@reduxjs/toolkit";

export const websocketSlice = createSlice({
  name: "websocket",

  initialState: {
    socket: null,
  },

  reducers: {
    initializeWebSocket: (state, action) => {
      state.socket = action.payload;
    },
    handleMessage: (state, action) => {
      state.socket && state.socket.send(JSON.stringify(action.payload));
    },
  },
});

export const { initializeWebSocket, handleMessage } = websocketSlice.actions;
export const selectWebSocket = (state) => state.websocket.socket;
