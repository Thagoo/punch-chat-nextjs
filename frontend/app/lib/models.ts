import mongoose, { Schema, model, Document } from "mongoose";

// async function connectDb() {
//   try {
//     mongoose
//       .connect(process.env.MONGODB_URI)
//       .then(() => {
//         console.log("mongodb is connected");
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     mongoose.Promise = global.Promise;
//     mongoose.connection.on("disconnected" | "error", (err) => {
//       console.log(err);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// connectDb();

// 1. Create an interface representing a document in MongoDB.
export interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  isAdmin: boolean;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  isAdmin: Boolean,
});

const User = mongoose.models?.User || model<IUser>("User", userSchema);

export { User };
