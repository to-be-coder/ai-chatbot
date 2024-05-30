import NoteForm from "@/components/CreateNoteForm";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { api } from "../../../lib/frontend/api";
import { createNoteSchema } from "../../../lib/validation/note";

export default async function AddNotePage() {
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
    <>
      <NoteForm
        form={form}
        handleSubmit={handleSubmit}
        mutation={createNoteMutation}
      />
    </>
  );
}
