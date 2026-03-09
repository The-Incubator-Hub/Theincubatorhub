import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth.mjs";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Sign In — The Incubator Hub",
  description: "Sign in to your Incubator Hub student portal.",
};

export default async function LoginPage({ searchParams }) {
  const session = await getAuthSession();
  if (session) {
    redirect("/portal/dashboard");
  }

  const params = await searchParams;
  const verified = params?.verified;
  const redirectTo = params?.redirect || "/portal/dashboard";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 mt-16">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src="/images/Iogo_incubator.png" alt="Incubator Hub" className="h-8 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 font-montserrat">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="/register" className="font-medium text-green-600 hover:text-green-500">
            Apply now
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {verified === "1" && (
            <div className="mb-4 rounded-md bg-green-50 border border-green-200 p-4">
              <p className="text-sm font-medium text-green-800">
                Email verified successfully! You can now sign in.
              </p>
            </div>
          )}
          {verified === "error" && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-4">
              <p className="text-sm font-medium text-red-800">
                Email verification failed. The link may have expired. Please request a new one after signing in.
              </p>
            </div>
          )}
          <LoginForm redirectTo={redirectTo} />
        </div>
      </div>
    </div>
  );
}
