import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const sendMessage = (data) => async (dispatch) => {
  const { message, recieverId, senderId } = data;
  const timestamp = new Date().toISOString();

  try {
    dispatch({
      type: "WEBSOCKET_SEND",
      payload: {
        type: "MESSAGE",
        data: {
          participants: { senderId: senderId, recieverId: recieverId },
          message: {
            content: message,
            timestamp: timestamp,
            senderId: senderId,
          },
        },
      },
    });
  } catch (error) {}
};

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
