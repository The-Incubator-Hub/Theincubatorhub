import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth.mjs";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password — The Incubator Hub",
  description: "Reset your Incubator Hub account password.",
};

export default async function ForgotPasswordPage() {
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
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ForgotPasswordForm />
          <div className="mt-6 text-center">
            <a href="/login" className="text-sm font-medium text-green-600 hover:text-green-500">
              Back to sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
