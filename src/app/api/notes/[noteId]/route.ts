import chatBotIndex from "../../../../../lib/db/pinecone";
import prisma from "../../../../../lib/db/prisma";
import { getEmbedding } from "../../../../../lib/openai";

export async function GET(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    if (!params.noteId) {
      console.error("no Id found");
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    const note = await prisma.note.findUnique({
      where: {
        id: params.noteId,
      },
    });

    if (!note) {
      console.error("no note found");
      return Response.json(
        { error: "There was no note found" },
        { status: 404 }
      );
    }

    return Response.json({ note }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    if (!params.noteId) {
      console.error("no Id found");
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const note = await prisma.note.findUnique({ where: { id: params.noteId } });

    if (!note) {
      return Response.json({ error: "note not found" }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.note.delete({
        where: { id: params.noteId },
      });

      //delete from pinecone
      await chatBotIndex.namespace("ns1").deleteOne(params.noteId);
    });

    return Response.json(
      { message: "note deleted", ok: true },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function getEmbeddingForNote(title: string, text: string) {
  return getEmbedding(title + "/n/n" + text ?? "");
}
