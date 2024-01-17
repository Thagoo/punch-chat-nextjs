import mongoose from "mongoose";

const mongoConnetion = {
  connected: 0,
};

export const connectDb = async () => {
  try {
    if (mongoConnetion.connected) {
      console.log(
        "using existing database connection",
        mongoose.connections[0].readyState
      );
      return;
    }

    await mongoose.connect(process.env.MONGODB_URL);
    mongoose.connection
      .on("error", (error) => {
        console.warn(error);
      })
      .once("open", () => {
        mongoConnetion.connected = mongoose.connections[0].readyState;
        console.log("connected to DB!");
      });
  } catch (error) {
    console.log(error);
  }
};
