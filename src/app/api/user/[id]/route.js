import { User } from "@/lib/models";
import { connectDb } from "@/lib/utils";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await connectDb();

    const user = await User.findById(id);

    if (user) {
      return Response.json(user, { status: 200 });
    } else {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};
