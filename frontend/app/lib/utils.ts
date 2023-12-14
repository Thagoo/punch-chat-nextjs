import mongoose from "mongoose";

const connection = {
  mongodbConnected: false,
  socketConnected: false,
};

export const connectToDB = async () => {
  try {
    if (connection.mongodbConnected) {
      console.log("Already connected to MongoDB");
      return;
    }

    const res = await mongoose.connect(process.env.MONGODB_URI);
    connection.mongodbConnected = true;
    console.log("mongodb connected, status", res.ConnectionStates.connected);
    mongoose.Promise = global.Promise;
    return;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

let socketInstance: WebSocket | null;
