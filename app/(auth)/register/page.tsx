import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = { title: "Create account" };

export default async function RegisterPage() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <>
      <h2 className="mb-4 text-center text-lg font-semibold">
        Create your account
      </h2>
      <RegisterForm />
    </>
  );
}
