"use client";

import { Box, Button, Container, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "../../lib/frontend/api";
import { createNoteSchema } from "../../lib/validation/note";

const CreateNoteForm = () => {
  const verifySchema = createNoteSchema;
  const validate = zodResolver(verifySchema);

  const form = useForm({
    validate: function (values: any) {
      const transformedValues = values;
      return validate(transformedValues);
    },
    initialValues: {
      title: null,
      text: null,
    },
  });

  const router = useRouter();

  const createNoteMutation = useMutation({
    mutationKey: ["create-note"],
    mutationFn: (data) => {
      return api
        .post("/api/notes", data)
        .then((response: any) => response.data);
    },
  });

  const handleSubmit = async (data: any) => {
    const { ok, result, error } = await createNoteMutation.mutateAsync(data);
    if (ok) {
    } else {
      alert(error);
    }
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Container size="xl">
        <TextInput
          withAsterisk
          label="Title"
          placeholder="title"
          key={form.key("title")}
          {...form.getInputProps("title")}
        />
        <TextInput
          withAsterisk
          label="Text"
          placeholder="text"
          key={form.key("text")}
          {...form.getInputProps("text")}
        />
        <Button type="submit" size="md" loading={createNoteMutation.isPending}>
          Post
        </Button>
      </Container>
    </Box>
  );
};

export default CreateNoteForm;
