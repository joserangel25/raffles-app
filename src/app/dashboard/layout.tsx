import { Sidebar } from "@/components";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="p-4 md:space-x-4 space-y-4 md:space-y-0 md:grid md:grid-cols-[300px,1fr]">
      <Sidebar />
      <div className="md:w-[400px] lg:w-[620px]">
        {children}
      </div>
    </div>
  );
}