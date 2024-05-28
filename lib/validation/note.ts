import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  text: z.string().min(1, { message: "title is required" }),
});

export type CreateNoteSchema = z.infer<typeof createNoteSchema>;
