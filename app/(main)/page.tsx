import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="rounded-2xl border border-border bg-card p-8">
      <h1 className="text-2xl font-bold">
        {session?.user
          ? `Welcome, ${session.user.name}!`
          : "Welcome to DevVerse"}
      </h1>
      <p className="mt-2 text-muted-foreground">Posts feed !</p>
    </div>
  );
}
