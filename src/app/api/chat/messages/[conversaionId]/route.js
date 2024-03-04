import { Conversation, Message } from "@/lib/models";
import { connectDb } from "@/lib/utils";

export async function POST(req, { params }) {
  const { conversationId } = params;

  const { senderId, recieverId, content } = await req.json();

  try {
    await connectDb();

    let conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      conversation = new Conversation({ participants: [senderId, recieverId] });
      await conversation.save();
    }
    const message = new Message({
      conversationId: conversation._id,
      senderId: senderId,
      content: content,
    });
    await message.save();

    conversation.lastMessage = content;
    await conversation.save();
    return Response.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 500 });
  }
}

export async function GET(req, { params }) {
  const { conversationId } = params;

  try {
    await connectDb();

    let messages = await Message.find({ conversationId });

    return Response.json(messages, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 500 });
  }
}
