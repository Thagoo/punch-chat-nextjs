"use server";

import { User } from "./models";
import { connectDb } from "./utils";
import z from "zod";
import bcrypt from "bcrypt";

let userSchema = z.object({
  firstName: z
    .string("Please fill this field")
    .min(3, "First name is too short")
    .max(32, "First name is too long"),

  lastName: z
    .string("Please fill this field")
    .min(3, "Last name is too short")
    .max(32, "Last name is too long"),
  email: z
    .string("Please fill this field")
    .email("Please provide a valid email")
    .min(1, "Value is too short"),
  password: z.string("Please fill this field").min(4, "Password is too short"),
});

export const register = async (prevState, formData) => {
  let newUserData = Object.fromEntries(formData);
  const validateUserData = userSchema.safeParse(newUserData);

  if (!validateUserData.success) {
    console.log(validateUserData.error.flatten().fieldErrors);
    return {
      errors: validateUserData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to User.",
    };
  }
  try {
    connectDb();

    const existingUser = await User.findOne({ email: newUserData.email });
    if (existingUser) {
      // Matching zod's practice
      prevState.errors.email = ["Email already exists try different"];
      return prevState;
    }
    const hashedPassword = bcrypt.hashSync(newUserData.password, 10);
    newUserData.password = hashedPassword;

    const user = new User(newUserData);
    const res = await user.save();
    console.log("user save succesfully", res);
    return {
      error: true,
    };
  } catch (error) {
    throw new Error(error);
    console.log(error);
  }
};
