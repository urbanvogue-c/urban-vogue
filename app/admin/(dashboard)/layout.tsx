import AdminSidebar from "@/components/admin/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-paper text-ink">
      <AdminSidebar />
      <div className="flex-1 px-10 py-10 max-w-6xl">{children}</div>
    </div>
  );
}
