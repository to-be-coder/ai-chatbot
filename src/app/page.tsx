"use client";

import ProjectCard from "@/components/ProjectCard";
import VercelAiChat from "@/components/VercelAiChat";
import { SimpleGrid } from "@mantine/core";

export default function Home() {
  return (
    <>
      <VercelAiChat />
      <SimpleGrid cols={3}>
        <ProjectCard title="1" text="hfsdjjakfhash" />
        <ProjectCard title="1" text="hfsdjjakfhash" />
        <ProjectCard title="1" text="hfsdjjakfhash" />
        <ProjectCard title="1" text="hfsdjjakfhash" />
        <ProjectCard title="1" text="hfsdjjakfhash" />
        <ProjectCard title="1" text="hfsdjjakfhash" />
      </SimpleGrid>
    </>
  );
}
