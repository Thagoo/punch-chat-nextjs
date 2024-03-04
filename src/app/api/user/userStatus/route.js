import { User } from "@/lib/models";
import { connectDb } from "@/lib/utils";

export const POST = async (req) => {
  const { userId } = await req.json();
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("setActive");

  try {
    connectDb();
    if (!query) {
      return Response.json({ status: 404 });
    }
    if (query) {
      const user = await User.findByIdAndUpdate(
        userId,
        { isActive: true },
        { new: true }
      );
      return Response.json({ status: 200 });
    } else {
      const user = await User.findByIdAndUpdate(
        userId,
        { isActive: false },
        { new: true }
      );
      return Response.json({ status: 200 });
    }
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  try {
    connectDb();
    if (!userId) {
      return Response.json({ status: 404 });
    }

    const user = await User.findById(userId);
    const status = user.isActive;
    return Response.json(status, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};
