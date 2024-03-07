import { Conversation, Message } from "@/lib/models";
import { connectDb } from "@/lib/utils";

export async function POST(req) {
  const searchParams = req.nextUrl.searchParams;
  const conversationId = searchParams.get("conversationId");
  const { senderId, recieverId, content } = await req.json();

  if (!senderId) {
    return Response.json({ status: 400 });
  }
  try {
    await connectDb();

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, recieverId],
      },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, recieverId],
      });
    }

    const message = new Message({
      conversationId: conversation._id,
      senderId: senderId,
      content: content,
    });
    await message.save();

    conversation.lastMessage = content;
    await conversation.save();
    if (!conversationId) {
      return Response.json(conversation, { status: 200 });
    }

    return Response.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 500 });
  }
}

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const conversationId = searchParams.get("conversationId");

  if (!conversationId) {
    return Response.json({ status: 400 });
  }
  try {
    await connectDb();

    let messages = await Message.find({ conversationId });
    if (!messages) {
      return Response.json({ status: 404 });
    }
    return Response.json(messages, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 500 });
  }
}
