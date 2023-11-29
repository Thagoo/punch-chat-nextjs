import mongoose, { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  isAdmin: Boolean,
});

const User = mongoose.models?.User || model<IUser>("User", userSchema);

export { User };
