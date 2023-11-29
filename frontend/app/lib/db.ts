import mongoose, { ConnectionStates } from "mongoose";

const connection = {
  isConnected: false, // Assuming isConnected is initially set to false
};

export const connectToDB = async () => {
  console.log(process.env.MONGODB_URI);

  try {
    if (connection.isConnected) {
      console.log("Already connected to MongoDB");
      return;
    }

    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("mongodb is connected");
      })
      .catch((error) => {
        console.log(error);
      });

    mongoose.Promise = global.Promise;
    mongoose.connection.on("disconnected" | "error", (err) => {
      console.log(err);
    });

    connection.isConnected =
      mongoose.connections[0].readyState === ConnectionStates.connected;
    console.log("MongoDB connection status:", connection.isConnected);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error(error);
  }
};
