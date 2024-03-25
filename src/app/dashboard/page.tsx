import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authConfig)
  if (!session?.user) {
    redirect('/api/auth/signin')
  }
  return (
    <div>
      <h1>Hello DashboardPage</h1>
      <pre>
        {JSON.stringify(session?.user, null, 2)}
      </pre>
    </div>
  );
}