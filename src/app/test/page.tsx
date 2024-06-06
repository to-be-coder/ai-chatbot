"use client";

import ProjectCard from "@/components/ProjectCard";
import VercelAiChat from "@/components/VercelAiChat";
import { SimpleGrid, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/frontend/api";

export default function Home() {
  const { isPending, isFetching, isError, data, fetchStatus, error } = useQuery(
    {
      queryKey: ["notes"],
      queryFn: async () => {
        return api.get(`/api/notes`).then((response: any) => response.data);
      },
    }
  );

  if (isPending) {
    return <Text>Loading ...</Text>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (fetchStatus === "idle" && data.allNotes) {
    return (
      <>
        <VercelAiChat />
        <SimpleGrid cols={3}>
          {data.allNotes.map((note: any) => (
            <ProjectCard
              title={note.title}
              text={note.text}
              link={`/note/${note.id}`}
            />
          ))}
        </SimpleGrid>
      </>
    );
  }
  return <Text>Loading... or the note you serched for may not exist</Text>;
}
