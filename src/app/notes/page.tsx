import { Metadata } from "next";
import { prisma } from "../../../lib/backend/prisma";

export const metadata: Metadata = {
  title: "notes",
};

export default async function NotesPage() {
  const allNotes = await prisma.note.findMany();
  return <div>{JSON.stringify(allNotes)}</div>;
}
