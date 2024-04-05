import { redirect } from "next/navigation";

export default async function DashboardPage() {
  redirect('/dashboard/my-raffles')
  return (
    <div>
      <pre>
        {/* {JSON.stringify(session?.user, null, 2)} */}
      </pre>
    </div>
  );
}