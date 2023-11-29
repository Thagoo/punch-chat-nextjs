import mongoose from "mongoose";

const connection = {
  isConnected: false, // Assuming isConnected is initially set to false
};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) {
      console.log("Already connected to MongoDB");
      return;
    }

    const res = await mongoose.connect(process.env.MONGODB_URI);
    if (res.ConnectionStates.connected === 1) {
      connection.isConnected = true;
      console.log("mongodb connection status", res.ConnectionStates.connected);
    }
    mongoose.Promise = global.Promise;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
