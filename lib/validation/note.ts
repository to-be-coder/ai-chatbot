import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  text: z.string().min(1, { message: "title is required" }),
});

export type CreateNoteSchema = z.infer<typeof createNoteSchema>;

export const updateNoteSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, { message: "title is required" }),
  text: z.string().min(1, { message: "title is required" }),
});

export const getNoteSchema = z.object({
  id: z.string().min(1),
});

export const deleteNoteSchema = z.object({
  id: z.string().min(1),
});
