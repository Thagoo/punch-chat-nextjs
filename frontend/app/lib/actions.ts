"use server";
import { signIn } from "@/auth";
import { connectToDB } from "./db";
import { User } from "./models";
import { z } from "zod";
import bcrypt from "bcrypt";

const userSchema = z.object({
  name: z.string({
    invalid_type_error: "Please enter your name",
  }),
  email: z.string().email(),
  avatar: z.string(),
  password: z
    .string()
    .min(6, "Password must be 6 characters long")
    .regex(/[a-zA-Z0-9]+/, {
      message: "Password must contain only alphanumeric characters",
    }),
  isAdmin: z.boolean(),
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    avatar?: string[];
    password?: string[];
    isAdmin?: string[];
  };
  message?: string | null;
};

export async function addUser(prevState: State, formData: FormData) {
  // console.log(formData.getAll());
  try {
    const validateUserFields = userSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      avatar: formData.get("avatar"),
      password: formData.get("password"),
      isAdmin: false,
    });
    if (!validateUserFields.success) {
      return {
        errors: validateUserFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Create Invoice.",
      };
    }

    connectToDB();

    const duplicateEmail = await User.findOne({
      email: validateUserFields.data.email,
    });
    if (duplicateEmail) {
      return {
        errors: "Email already exists try different Email",
      };
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(validateUserFields.data.password, salt);
    validateUserFields.data.password = hash;
    const user = new User(validateUserFields.data);
    await user.save();
    console.log("user save", user);
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      console.log(error);
      return {
        errors: "Something went wrong!",
      };
    }
    throw error;
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialsSignin";
    }
    throw error;
  }
}
