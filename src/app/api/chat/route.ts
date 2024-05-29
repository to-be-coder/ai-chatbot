import { openai } from "@ai-sdk/openai";
import { StreamData, StreamingTextResponse, streamText } from "ai";
import prisma from "../../../../lib/db/prisma";
import { getEmbedding } from "../../../../lib/openai";
import chatBotIndex from "../../../../lib/db/pinecone";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    //only take the last six messages
    const messagesTruncated = messages.slice(-6);

    const embedding = await getEmbedding(
      messagesTruncated.map((message: any) => message.content).join("\n")
    );

    //storing into pinecone
    const vectorQueryResponse = await chatBotIndex.namespace("ns1").query({
      vector: embedding,
      topK: 1,
      // filter:{userId}
    });

    const relevantNotes = await prisma.note.findMany({
      where: {
        id: {
          in: vectorQueryResponse.matches.map((match) => match.id),
        },
      },
    });

    console.log("relecant notes", relevantNotes);

    const result = await streamText({
      model: openai("gpt-4-turbo"),
      messages: [
        {
          role: "system",
          content:
            "You are a helpful bot" +
            "the relevant notes for this query are\n" +
            relevantNotes
              .map((note) => `Title:${note.title}\n\ntext:${note.text}`)
              .join("\n\n"),
        },
        ...messagesTruncated,
      ],
    });

    const data = new StreamData();

    data.append({ test: "value" });

    const stream = result.toAIStream({
      onFinal(_) {
        data.close();
      },
    });

    return new StreamingTextResponse(stream, {}, data);
  } catch (error) {
    return Response.json({ error });
  }
}
