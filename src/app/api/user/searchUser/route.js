import { User } from "@/lib/models";
import { connectDb } from "@/lib/utils";

export const POST = async (req) => {
  const { term } = await req.json();

  try {
    await connectDb();

    const user = await User.find({ username: new RegExp(term, "i") });

    if (user) {
      return Response.json(user, { status: 200 });
    } else {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};
