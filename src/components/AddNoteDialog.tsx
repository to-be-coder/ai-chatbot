import { Box, Button, Container } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { api } from "../../lib/frontend/api";
import { createNoteSchema } from "../../lib/validation/note";

interface AddNoteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddNoteDialog = ({ open, setOpen }: AddNoteDialogProps) => {
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
        <Button
          type="submit"
          size="md"
          loading={createProjectUpdateMutation.isPending}
        >
          Post
        </Button>
      </Container>
    </Box>
  );
};

export default AddNoteDialog;
