import ResetPasswordForm from "./ResetPasswordForm";

export const metadata = {
  title: "Reset Password — The Incubator Hub",
  description: "Set a new password for your Incubator Hub account.",
};

export default async function ResetPasswordPage({ searchParams }) {
  const params = await searchParams;
  const token = params?.token || "";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 mt-16">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src="/images/Iogo_incubator.png" alt="Incubator Hub" className="h-8 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 font-montserrat">
          Set new password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter a strong new password for your account.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ResetPasswordForm token={token} />
        </div>
      </div>
    </div>
  );
}
