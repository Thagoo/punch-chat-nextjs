import { Conversation, User } from "@/lib/models";
import { connectDb } from "@/lib/utils";

export async function GET(req, { params }) {
  const { userId } = params;

  try {
    await connectDb();

    const conversations = await Conversation.find({ participants: userId });
    if (!conversations) {
      return Response.json("conversation not found", { status: 404 });
    }
    const updatedConversation = await Promise.all(
      conversations.map(async (conversation) => {
        const id = conversation.participants.filter((participantId) => {
          return participantId.toString() !== userId;
        });
        const targetUserId = id.toString();

        const user = await User.findById(targetUserId);

        return {
          ...conversation.toObject(),
          targetUserDetails: user,
        };
      })
    );

    return Response.json(updatedConversation, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 500 });
  }
}
