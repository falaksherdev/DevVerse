import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be at most 150 characters"),
  content: z
    .string()
    .trim()
    .min(50, "Content must be at least 50 characters")
    .max(50000, "Content is too long"),
  coverImage: z
    .union([z.literal(""), z.string().trim().url("Enter a valid image URL")])
    .optional(),
  tags: z.array(z.string().max(30)).max(5, "Maximum 5 tags allowed"),
});

export type PostInput = z.infer<typeof postSchema>;
