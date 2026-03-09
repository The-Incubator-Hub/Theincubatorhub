import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth.mjs";
import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "Create Account — The Incubator Hub",
  description: "Create your Incubator Hub account to apply for programs.",
};

export default async function RegisterPage() {
  const session = await getAuthSession();
  if (session) {
    redirect("/portal/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 mt-16">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src="/images/Iogo_incubator.png" alt="Incubator Hub" className="h-8 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 font-montserrat">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-green-600 hover:text-green-500">
            Sign in
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
