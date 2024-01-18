"use server";

import { User } from "./models";
import { connectDb } from "./utils";
import z from "zod";
import bcrypt from "bcrypt";
import { signIn } from "./auth";

let userSchema = z.object({
  firstName: z
    .string("Please fill this field")
    .min(3, "First name is too short")
    .max(32, "First name is too long"),

  lastName: z.string("Please fill this field").max(32, "Last name is too long"),
  email: z
    .string("Please fill this field")
    .email("Please provide a valid email")
    .min(1, "Value is too short"),
  password: z.string("Please fill this field").min(4, "Password is too short"),
});

const loginUserSchema = z.object({
  email: userSchema.shape.email,
  password: userSchema.shape.password,
});

export const register = async (prevState, formData) => {
  let newUserData = Object.fromEntries(formData);
  const validateUserData = userSchema.safeParse(newUserData);

  if (!validateUserData.success) {
    return {
      errors: validateUserData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to User.",
    };
  }
  try {
    connectDb();

    const existingUser = await User.findOne({
      email: validateUserData.data.email,
    });
    if (existingUser) {
      // Matching zod's practice
      prevState.errors.email = ["Email already exists try different"];
      return prevState;
    }
    const hashedPassword = bcrypt.hashSync(validateUserData.data.password, 10);
    validateUserData.data.password = hashedPassword;

    const user = new User(validateUserData.data);
    await user.save();

    // Signing In user straight away
    await signIn("credentials", validateUserData.data);

    return;
  } catch (error) {
    throw error;
  }
};

export const login = async (prevState, formData) => {
  const credentials = Object.fromEntries(formData);
  const validateUserData = loginUserSchema.safeParse(credentials);

  if (!validateUserData.success) {
    return {
      errors: validateUserData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to User.",
    };
  }

  try {
    connectDb();

    const user = await User.findOne({ email: validateUserData.data.email });

    if (!user) {
      // Matching zod's practice
      prevState.errors.email = ["Email does not exist"];
      return prevState;
    }
    const isPasswordMatch = await bcrypt.compare(
      validateUserData.data.password,
      user.password
    );
    if (!isPasswordMatch) {
      prevState.errors.password = ["Password does not match"];
      return prevState;
    }

    prevState.message = "success";

    if (user) {
      await signIn("credentials", validateUserData.data);
    }

    //return prevState;
  } catch (error) {
    // Fix "Error: NEXT_REDIRECT" next.js shows this error if you do any furthur actions like console log after signIn.
    throw error;
  }
};
