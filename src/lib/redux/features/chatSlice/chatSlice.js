import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (data, thunkAPI) => {
    const state = thunkAPI.getState();
    const conversationId = state.chat.currentConversation._id;
    if (!conversationId) {
      return [];
    }
    try {
      const result = await fetch(
        `/api/chat/messages?conversationId=${conversationId}`,
        {
          method: "GET",
        }
      );
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
  async (arg, { getState }) => {
    const state = getState();
    const userId = state.chat.currentUserId;
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

export const saveMessage = createAsyncThunk(
  "chat/saveMessage",
  async (data, thunkAPI) => {
    const state = thunkAPI.getState();

    const conversationId = state.chat.currentConversation._id;

    // null query parameter is converted to "null" string so avoid sending null
    const endpoint = conversationId
      ? `/api/chat/messages?conversationId=${conversationId}`
      : "/api/chat/messages";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const fetchUser = createAsyncThunk("chat/fetchUser", async (id) => {
  try {
    const result = await fetch(`/api/user/${id}`, {
      method: "GET",
    });

    if (result.status !== 200) {
      return null;
    }
    return result.json();
  } catch (error) {
    throw new Error(error);
  }
});

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    currentUserId: "",
    activeStatus: false,
    messages: [],
    conversations: [],
    currentConversation: null,
  },
  reducers: {
    setStatus: (state, action) => {
      state.activeStatus = action.payload;
    },
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
    builder.addCase(fetchMessages.pending, (state, action) => {
      state.messages = "loading";
    });

    builder.addCase(fetchConversations.fulfilled, (state, action) => {
      state.conversations = action.payload;
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.currentConversation = {
        _id: null,
        targetUserDetails: action.payload,
      };
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      state.currentConversation = "loading";
    });
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
          senderId: senderId,
          recieverId: recieverId,
          content: message,
          timestamp: timestamp,
        },
      },
    });
  } catch (error) {}
};

export const {
  setStatus,
  addMessage,
  setCurrentConversation,
  setCurrentUserId,
} = chatSlice.actions;
export const selectMessages = (state) => state.chat.messages;
export const selectConversations = (state) => state.chat.conversations;
export const selectCurrentConversation = (state) =>
  state.chat.currentConversation;
export const selectActiveStatus = (state) => state.chat.activeStatus;
export const selectCurrentUserId = (state) => state.chat.currentUserId;
export default chatSlice.reducer;
