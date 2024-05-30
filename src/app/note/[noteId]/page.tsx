"use client";

import { Button, Group, Text } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "../../../../lib/frontend/api";

export type NotePageProps = {
  params: {
    noteId: string;
  };
};

export default function NotePage({ params }: NotePageProps) {
  const paramNote = params.noteId;

  const router = useRouter();

  const { isPending, isError, data, fetchStatus, error } = useQuery({
    queryKey: ["note", paramNote],
    queryFn: () => {
      return api
        .get(`/api/notes/${paramNote}`)
        .then((response: any) => response.data);
    },
  });

  const deleteNoteMutation = useMutation({
    mutationKey: ["delete-note"],
    mutationFn: () => {
      console.log("this is inside of the mutateAsync");
      return api
        .delete(`/api/notes/${paramNote}`)
        .then((response: any) => response.data);
    },
  });

  const handleDelete = async () => {
    const { ok, result, error, message, status } =
      await deleteNoteMutation.mutateAsync();

    if (ok) {
      router.refresh();
    } else {
      console.log(message);
      alert(error);
    }
  };

  if (isPending) {
    <Text>Loading ...</Text>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (fetchStatus === "idle" && data.note) {
    return (
      <>
        <Group>
          <Button>Save</Button>{" "}
          <Button loading={deleteNoteMutation.isPending} onClick={handleDelete}>
            Delete
          </Button>
        </Group>
        <Text>{data.note.title}</Text>
        <Text>{data.note.text}</Text>
      </>
    );
  }

  return <Text>Loading</Text>;
}
