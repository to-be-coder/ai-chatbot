import { Box, Button, Container, SimpleGrid, Stack } from "@mantine/core";

import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { z } from "zod";
import { api } from "../../lib/frontend/api";

const AddNoteDialog = () => {
  const verifySchema = z.object({
    title: z.string().min(1, { message: "title is required" }),
    text: z.string().min(1, { message: "text is required" }),
  });
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

  const createProjectUpdateMutation = useMutation({
    mutationKey: ["create-project-update"],
    mutationFn: (data) => {
      return api
        .post("/api/project-updates", data)
        .then((response: any) => response.data);
    },
  });

  const handleSubmit = async (data: any) => {
    const { ok, result, error } = await createProjectUpdateMutation.mutateAsync(
      data
    );
    if (ok) {
      router.reload();
    } else {
      alert(error);
    }
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Container size="xl">
        <Stack>
          <SimpleGrid cols={2}>
            <Button
              type="submit"
              size="md"
              loading={createProjectUpdateMutation.isPending}
            >
              Post
            </Button>
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};

export default AddNoteDialog;
