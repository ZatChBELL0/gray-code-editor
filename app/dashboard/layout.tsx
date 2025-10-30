import { SidebarProvider } from "@/components/ui/sidebar";
import { getAllPlaygroundForUser } from "@/modules/dashboard/actions";
import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar";

export default async function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const playgroundData = await getAllPlaygroundForUser();

  const technologyIconMap: Record<string, string> = {
    REACT: "Zap",
    NEXTJS: "Lightbulb",
    EXPRESS: "Database",
    VUE: "Compass",
    HONO: "FlameIcon",
    ANGULAR: "Terminal",
  };
  { /* @tsingnore */ }
  const foramttedPlaygroundData = playgroundData?.map((item: any) => ({
    id: item.id,
    name: item.title,
    starred: false,
    icon: technologyIconMap[item.template] || "Code2",
  }));

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <DashboardSidebar initialPlaygroundData={foramttedPlaygroundData} />
        <main className="flex-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
