import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = { title: "Log in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const session = await auth();
  if (session) redirect("/");

  const { registered } = await searchParams;

  return (
    <>
      <h2 className="mb-4 text-center text-lg font-semibold">Welcome back</h2>

      {registered === "true" && (
        <p className="mb-4 rounded-lg bg-success-soft px-3.5 py-2.5 text-sm text-success">
          Account created! Please log in.
        </p>
      )}

      <LoginForm />
    </>
  );
}
