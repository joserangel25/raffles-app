import { Sidebar } from "@/components";
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authConfig)
  if (!session?.user) {
    redirect('/auth/login')
  }
  return (
    <div
      className="p-4 md:space-x-4 space-y-4 md:space-y-0 md:grid md:grid-cols-[300px,1fr]">
      <Sidebar />
      <div className="">
        {children}
      </div>
    </div>
  );
}