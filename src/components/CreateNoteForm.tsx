"use client";

import { Box, Button, Container, TextInput } from "@mantine/core";

type NoteFormProps = {
  form: any;
  handleSubmit: any;
  mutation: any;
};
const NoteForm = ({ form, handleSubmit, mutation }: NoteFormProps) => {
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
        <Button type="submit" size="md" loading={mutation.isPending}>
          Post
        </Button>
      </Container>
    </Box>
  );
};

export default NoteForm;
