"use client";

import { useActionState } from "react";
import { createPost, type PostFormState } from "@/lib/actions/post";

const initialState: PostFormState = {};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-danger">{message}</p>;
}

export default function PostForm() {
  const [state, formAction, isPending] = useActionState(
    createPost,
    initialState,
  );
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <p className="rounded-lg bg-danger-soft px-3.5 py-2.5 text-sm text-danger">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={state.values?.title}
          placeholder="Your post title"
          className="input text-lg font-semibold"
        />
        <FieldError message={errors.title} />
      </div>

      <div>
        <label
          htmlFor="coverImage"
          className="mb-1.5 block text-sm font-medium"
        >
          Cover image URL{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input
          id="coverImage"
          name="coverImage"
          type="text"
          defaultValue={state.values?.coverImage}
          placeholder="https://..."
          className="input"
        />
        <FieldError message={errors.coverImage} />
      </div>

      <div>
        <label htmlFor="tags" className="mb-1.5 block text-sm font-medium">
          Tags{" "}
          <span className="font-normal text-muted-foreground">
            (comma separated, max 5)
          </span>
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          defaultValue={state.values?.tags}
          placeholder="react, nextjs, typescript"
          className="input"
        />
        <FieldError message={errors.tags} />
      </div>

      <div>
        <label htmlFor="content" className="mb-1.5 block text-sm font-medium">
          Content{" "}
          <span className="font-normal text-muted-foreground">
            (Markdown supported)
          </span>
        </label>
        <textarea
          id="content"
          name="content"
          rows={16}
          defaultValue={state.values?.content}
          placeholder="Write your post here..."
          className="input min-h-72 resize-y font-mono leading-relaxed"
        />
        <FieldError message={errors.content} />
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={isPending} className="btn btn-primary">
          {isPending ? "Publishing..." : "Publish post"}
        </button>
      </div>
    </form>
  );
}
