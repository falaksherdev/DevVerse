"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Post from "@/models/Post";
import { postSchema } from "@/lib/validations/post";
import {
  slugify,
  calculateReadingTime,
  createExcerpt,
  parseTags,
} from "@/lib/utils";

export type PostFormState = {
  error?: string;
  fieldErrors?: Partial<Record<string, string>>;
  values?: { title: string; content: string; coverImage: string; tags: string };
};

async function generateUniqueSlug(title: string): Promise<string> {
  const base = slugify(title);
  let slug = base;

  while (await Post.exists({ slug })) {
    slug = `${base}-${Math.random().toString(36).slice(2, 6)}`;
  }
  return slug;
}

export async function createPost(
  prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to create a post" };
  }

  const values = {
    title: String(formData.get("title") ?? ""),
    content: String(formData.get("content") ?? ""),
    coverImage: String(formData.get("coverImage") ?? ""),
    tags: String(formData.get("tags") ?? ""),
  };

  const parsed = postSchema.safeParse({
    ...values,
    tags: parseTags(values.tags),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { fieldErrors, values };
  }

  const { title, content, coverImage, tags } = parsed.data;

  let slug: string;
  try {
    await connectDB();
    slug = await generateUniqueSlug(title);

    await Post.create({
      title,
      slug,
      content,
      excerpt: createExcerpt(content),
      coverImage: coverImage ?? "",
      tags,
      author: session.user.id,
      readingTime: calculateReadingTime(content),
    });
  } catch (err) {
    console.error("Create post error:", err);
    return { error: "Something went wrong. Please try again.", values };
  }

  revalidatePath("/");
  redirect(`/posts/${slug}`);
}
