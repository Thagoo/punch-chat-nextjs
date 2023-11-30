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
    connection.isConnected = true;
    console.log("mongodb connected, status", res.ConnectionStates.connected);
    mongoose.Promise = global.Promise;
    return;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
