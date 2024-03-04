import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (conversationId) => {
    try {
      const result = await fetch(`{/api/chat/messages/${conversationId}}`, {
        method: "GET",
      });
      if (result.status !== 200) {
        return null;
      }
      return result.json();
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async (userId) => {
    try {
      const result = await fetch(`/api/chat/conversations/${userId}`, {
        method: "GET",
      });

      if (result.status !== 200) {
        return null;
      }
      return result.json();
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    activeStatus: false,
    messages: [],
    conversations: [],
    currentConversationId: "",
  },
  reducers: {
    setStatus: (state, action) => {
      state.activeStatus = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages.push(action.payload);
    });
    builder.addCase(fetchConversations.fulfilled, (state, action) => {
      state.conversations = action.payload;
    });
  },
});

export const saveMessage = async (data) => {
  const conversationId = state.chat.currentConversationId;
  try {
    const response = await fetch(`/api/chat/messages[${conversationId}]]`, {
      method: "POST",
      body: data,
    });
  } catch (error) {
    throw new Error(error);
  }
};
export const sendMessage = (data) => async (dispatch) => {
  const { message, recieverId, senderId } = data;
  const timestamp = new Date().toISOString();

  try {
    dispatch({
      type: "WEBSOCKET_SEND",
      payload: {
        type: "MESSAGE",
        data: {
          senderId: senderId,
          recieverId: recieverId,
          content: message,
          timestamp: timestamp,
        },
      },
    });
  } catch (error) {}
};

export const { setStatus, addMessage } = chatSlice.actions;
export const selectMessages = (state) => state.chat.messages;
export const selectConversations = (state) => state.chat.conversations;
export const selectActiveStatus = (state) => state.chat.activeStatus;
export default chatSlice.reducer;
