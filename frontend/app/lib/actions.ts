"use server";
import { signIn } from "@/auth";
import { connectToDB } from "./utils";
import { User } from "./models";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

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

const loginUserSchema = z.object({
  email: userSchema.shape.email,
  password: userSchema.shape.password,
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    avatar?: string[];
    password?: string[];
    isAdmin?: boolean[];
  };
  message?: string | null;
};

export async function addUser(prevState: State, formData: FormData) {
  try {
    const validateUserFields = userSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      avatar: formData.get("avatar") || "",
      password: formData.get("password"),
      isAdmin: formData.get("isAdmin") || false,
    });
    if (!validateUserFields.success) {
      return {
        errors: validateUserFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Create User",
      };
    }

    await connectToDB();

    const duplicateEmail = await User.findOne({
      email: validateUserFields.data.email,
    });

    if (duplicateEmail) {
      return {
        errors: { email: ["Email already exists"] },
      };
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(validateUserFields.data.password, salt);
    validateUserFields.data.password = hash;
    const user = new User(validateUserFields.data);
    await user.save();
    try {
      const data = {
        email: validateUserFields.data.email,
        password: validateUserFields.data.password,
      };

      await signIn("credentials", data);
    } catch (error) {
      console.log(error.name);
    }

    prevState.message = "success";
    return prevState;
  } catch (error) {
    console.log(error);
    return {
      message: "Something went wrong!",
    };
  }
}

export async function authenticate(prevState: State, formData: FormData) {
  const validateUserFields = loginUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validateUserFields.success) {
    return {
      errors: validateUserFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to login",
    };
  }
  try {
    await connectToDB();
    const user = await User.findOne({ email: validateUserFields.data.email });
    if (!user) {
      return {
        errors: { email: ["Email doesn't exist"] },
      };
    }
    const isPasswordCorrect = await bcrypt.compare(
      validateUserFields.data.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return {
        errors: { password: ["Password doesn't match"] },
      };
    }

    await signIn("credentials", validateUserFields.data);

    return prevState;
  } catch (error) {
    throw error;
  }
}
