import { prisma } from "../../../../lib/backend/prisma";
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

    const note = await prisma.note.create({
      data: {
        title,
        text,
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
