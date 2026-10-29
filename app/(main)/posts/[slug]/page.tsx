import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import Post from "@/models/Post";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  await connectDB();
  const post = await Post.findOne({ slug })
    .populate("author", "name username")
    .lean<{
      title: string;
      content: string;
      tags: string[];
      readingTime: number;
      author: { name: string; username: string };
    }>();

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        By {post.author.name} · {post.readingTime} min read
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
          >
            #{tag}
          </span>
        ))}
      </div>
      <pre className="mt-8 whitespace-pre-wrap font-serif text-lg leading-relaxed">
        {post.content}
      </pre>
    </article>
  );
}
