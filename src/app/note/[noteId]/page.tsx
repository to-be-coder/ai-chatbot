"use client";

import NoteForm from "@/components/CreateNoteForm";
import { Button, Group, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDidUpdate } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "../../../../lib/frontend/api";
import { createNoteSchema } from "../../../../lib/validation/note";

export type NotePageProps = {
  params: {
    noteId: string;
  };
};

export default function NotePage({ params }: NotePageProps) {
  const paramNote = params.noteId;

  const router = useRouter();

  const { isPending, isFetching, isError, data, fetchStatus, error } = useQuery(
    {
      queryKey: ["note", paramNote],
      queryFn: () => {
        return api
          .get(`/api/notes/${paramNote}`)
          .then((response: any) => response.data);
      },
    }
  );

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

  const verifySchema = createNoteSchema;
  const validate = zodResolver(verifySchema);

  const form = useForm({
    validate: function (values: any) {
      const transformedValues = values;
      return validate(transformedValues);
    },
    // initialValues: {
    //   id: paramNote,
    //   title: data.note?.title || null,
    //   text: data?.note?.text || null,
    // },
  });

  useDidUpdate(() => {
    form.setValues({
      id: paramNote,
      title: data.note?.title || null,
      text: data?.note?.text || null,
    });
  }, [data]);

  const editNoteMutation = useMutation({
    mutationKey: ["edi-note"],
    mutationFn: (data) => {
      return api
        .patch("/api/notes", data)
        .then((response: any) => response.data);
    },
  });

  const handleEdit = async (data: any) => {
    const { ok, result, error } = await editNoteMutation.mutateAsync(data);
    if (ok) {
    } else {
      alert(error);
    }
  };

  if (isFetching) {
    return <Text>Loading ...</Text>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (fetchStatus === "idle" && data.note) {
    return (
      <>
        <Group>
          <Button loading={deleteNoteMutation.isPending} onClick={handleDelete}>
            Delete
          </Button>
        </Group>
        <NoteForm
          form={form}
          handleSubmit={handleEdit}
          mutation={editNoteMutation}
        />
      </>
    );
  }

  return <Text>Loading... or the note you serched for may not exist</Text>;
}
