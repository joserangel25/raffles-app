import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authConfig)

  if (session?.user) {
    redirect('/')
  }
  return (
    <div className="">
      {children}
    </div>
  );
}