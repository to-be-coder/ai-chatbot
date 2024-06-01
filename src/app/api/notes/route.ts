import chatBotIndex from "../../../../lib/db/pinecone";
import prisma from "../../../../lib/db/prisma";
import { getEmbedding } from "../../../../lib/openai";
import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from "../../../../lib/validation/note";

export async function GET() {
  try {
    const allNotes = await prisma.note.findMany();

    return Response.json({ allNotes }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

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

      await chatBotIndex.namespace("ns1").upsert([
        {
          id: note.id,
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
export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const parseResult = updateNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id, title, text } = parseResult.data;

    const note = await prisma.note.findUnique({ where: { id } });

    if (!note) {
      return Response.json({ error: "note not found" }, { status: 404 });
    }

    //generate embedding
    const embedding = await getEmbeddingForNote(title, text);

    const updateNote = await prisma.$transaction(async (tx) => {
      const note = await tx.note.update({
        where: { id },
        data: {
          title,
          text,
        },
      });

      //storing into pinecone

      await chatBotIndex.namespace("ns1").upsert([
        {
          id,
          values: embedding,
          // metadata:{userId}
        },
      ]);

      return note;
    });

    return Response.json({ updateNote }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function Delete(req: Request) {
  try {
    const body = await req.json();

    const parseResult = deleteNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id } = parseResult.data;

    const note = await prisma.note.findUnique({ where: { id } });

    if (!note) {
      return Response.json({ error: "note not found" }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.note.delete({
        where: { id },
      });

      //delete from pinecone
      await chatBotIndex.namespace("ns1").deleteOne(id);
    });

    return Response.json({ message: "note deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function getEmbeddingForNote(title: string, text: string) {
  return getEmbedding(title + "/n/n" + text ?? "");
}
