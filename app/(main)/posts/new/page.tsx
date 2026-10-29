import PostForm from "@/components/posts/PostForm";

export const metadata = { title: "Write a post" };

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">Write a new post</h1>
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <PostForm />
      </div>
    </div>
  );
}
