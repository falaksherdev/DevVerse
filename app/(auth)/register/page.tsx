import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <>
      <h2 className="mb-4 text-center text-lg font-semibold">
        Create your account
      </h2>
      <RegisterForm />
    </>
  );
}
