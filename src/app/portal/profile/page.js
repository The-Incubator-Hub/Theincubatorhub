import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth.mjs";
import PortalSidebar from "@/components/portal/PortalSidebar";
import ProfileForm from "./ProfileForm";

export const metadata = {
  title: "My Profile — The Incubator Hub",
};

export default async function ProfilePage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login?redirect=/portal/profile");
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <PortalSidebar user={session.user} />
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 font-montserrat">My Profile</h1>
              <p className="mt-1 text-sm text-gray-600">Update your personal information.</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <ProfileForm user={session.user} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
