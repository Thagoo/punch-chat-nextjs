"use server";

import { User } from "./models";
import { connectDb, convertToFile } from "./utils";
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
    .min(5, "Value is too short"),
  username: z
    .string("Please fill this field")
    .min(3, "Value is too short")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "This field cannot contain white space and special character"
    ),
  password: z
    .string("Please fill this field")
    .min(4, "Password is too short")
    .max(15, "Maximum 15 characters"),
  avatar: z.string(""),
});

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

const loginUserSchema = z.object({
  username: userSchema.shape.username,
  password: userSchema.shape.password,
});

export const register = async (prevState, formData) => {
  let newUserData = Object.fromEntries(formData);

  const validateUserData = userSchema.safeParse(newUserData);

  if (!validateUserData.success) {
    const errorss = validateUserData.error.flatten().fieldErrors;

    return {
      errors: validateUserData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to User.",
    };
  }
  try {
    connectDb();

    const existingEmail = await User.findOne({
      email: validateUserData.data.email,
    });
    if (existingEmail) {
      // Matching zod's practice
      prevState.errors.email = ["Email already exists try different"];
      return prevState;
    }

    const existingUsername = await User.findOne({
      username: validateUserData.data.username,
    });
    if (existingUsername) {
      // Matching zod's practice
      prevState.errors.username = ["Username already exists try different"];
      return prevState;
    }

    const avatarData = new FormData();
    if (newUserData.avatar) {
      const avatar = await convertToFile(newUserData.avatar);
      avatarData.append("file", avatar);
      avatarData.append("upload_preset", "upload");
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "post",
        body: avatarData,
      }
    );
    const parsed = await response.json();
    validateUserData.data.avatar = parsed.url;

    const hashedPassword = bcrypt.hashSync(validateUserData.data.password, 10);
    validateUserData.data.password = hashedPassword;

    const user = new User(validateUserData.data);

    await user.save();

    // Signing In user straight away
    await signIn("credentials", validateUserData.data);

    return {
      errors: null,
      message: "User successfully created",
    };
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

    const user = await User.findOne({
      username: validateUserData.data.username,
    });

    if (!user) {
      // Matching zod's practice
      prevState.errors.username = ["Username does not exist"];
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
