import { User } from "@/lib/models";
import { connectDb } from "@/lib/utils";

export const POST = async (req) => {
  const { term } = await req.json();

  try {
    await connectDb();

    const user = await User.findOne({
      username: term,
    });

    if (user) {
      const result = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
      };

      return Response.json(result, { status: 200 });
    } else {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};
