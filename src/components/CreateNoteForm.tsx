"use client";

import { Box, Button, Container, Stack, TextInput, Title } from "@mantine/core";

type NoteFormProps = {
  form: any;
  handleSubmit: any;
  mutation: any;
};
const NoteForm = ({ form, handleSubmit, mutation }: NoteFormProps) => {
  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
      h="100vh"
      style={{ display: "flex", flex: 1 }}
    >
      <Container w="70vw">
        <Stack justify="center" h="100%">
          <Title ta="center">Add a New Note</Title>
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
        </Stack>
      </Container>
    </Box>
  );
};

export default NoteForm;
