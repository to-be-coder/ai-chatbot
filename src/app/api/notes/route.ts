import createPineconeIndex from "../../../../lib/db/pinecone";
import prisma from "../../../../lib/db/prisma";
import { getEmbedding } from "../../../../lib/openai";
import { createNoteSchema } from "../../../../lib/validation/note";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parseResult = createNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { title, text } = parseResult.data;

    //generate embedding
    const embedding = await getEmbeddingForNote(title, text);

    const note = await prisma.$transaction(async (tx) => {
      const note = await tx.note.create({
        data: {
          title,
          text,
        },
      });

      //storing into pinecone
      const index = await createPineconeIndex();
      await index.namespace("ns1").upsert([
        {
          id: `${note.id}`,
          values: embedding,
          // metadata:{userId}
        },
      ]);

      return note;
    });

    return Response.json({ note }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function getEmbeddingForNote(title: string, text: string) {
  return getEmbedding(title + "/n/n" + text ?? "");
}
