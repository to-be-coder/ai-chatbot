import ProjectCard from "@/components/ProjectCard";
import VercelAiChat from "@/components/VercelAiChat";
import { SimpleGrid } from "@mantine/core";
import prisma from "../../lib/db/prisma";

export default async function Home() {
  const allNotes = await prisma.note.findMany();
  return (
    <>
      <VercelAiChat />
      <SimpleGrid cols={3}>
        {allNotes.map((note) => (
          <ProjectCard title={note.title} text={note.text} />
        ))}
      </SimpleGrid>
      \
    </>
  );
}
