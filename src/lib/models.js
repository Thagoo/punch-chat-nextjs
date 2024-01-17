import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  password: { type: String, required: true },
  avatar: { type: String },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
